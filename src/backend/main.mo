import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Migration "migration";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run) actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type TaskId = Nat;
  type Date = Text;

  type Category = {
    #study;
    #fitness;
    #health;
    #work;
    #personalDevelopment;
    #social;
    #other;
  };

  type Priority = {
    #low;
    #medium;
    #high;
  };

  type CategorySummary = {
    category : Text;
    totalTasks : Nat;
    completedTasks : Nat;
    completionPercentage : Float;
    date : Date;
  };

  type Task = {
    id : TaskId;
    name : Text;
    category : Category;
    priority : Priority;
    estimatedDuration : Nat;
    date : Date;
    completed : Bool;
    createdAt : Int;
  };

  public type UserProfile = {
    name : Text;
    preferences : ?Text;
  };

  public type TaskSuggestion = {
    name : Text;
    category : Category;
    priority : Priority;
    estimatedDuration : Nat;
    reason : Text;
  };

  var nextTaskId = 0;

  let userTasks = Map.empty<Principal, Map.Map<Nat, Task>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userCategorySummaries = Map.empty<Principal, Map.Map<Date, CategorySummary>>();

  module Task {
    public func compare(task1 : Task, task2 : Task) : Order.Order {
      Nat.compare(task1.id, task2.id);
    };
  };

  // User Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Task Management Functions
  public shared ({ caller }) func createTask(
    name : Text,
    category : Category,
    priority : Priority,
    estimatedDuration : Nat,
    date : Date,
    createdAt : Int,
  ) : async TaskId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create tasks");
    };

    let taskId = nextTaskId;
    nextTaskId += 1;

    let task : Task = {
      id = taskId;
      name;
      category;
      priority;
      estimatedDuration;
      date;
      completed = false;
      createdAt;
    };

    let tasks = switch (userTasks.get(caller)) {
      case (null) { Map.empty<Nat, Task>() };
      case (?t) { t };
    };

    tasks.add(taskId, task);
    userTasks.add(caller, tasks);
    taskId;
  };

  public shared ({ caller }) func updateTask(
    taskId : TaskId,
    name : Text,
    category : Category,
    priority : Priority,
    estimatedDuration : Nat,
    date : Date,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update tasks");
    };

    switch (userTasks.get(caller)) {
      case (null) { Runtime.trap("User has no tasks") };
      case (?tasks) {
        switch (tasks.get(taskId)) {
          case (null) { Runtime.trap("Task not found") };
          case (?task) {
            let updatedTask : Task = {
              task with
              name;
              category;
              priority;
              estimatedDuration;
              date;
            };
            tasks.add(taskId, updatedTask);
          };
        };
      };
    };
  };

  public shared ({ caller }) func deleteTask(taskId : TaskId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete tasks");
    };

    switch (userTasks.get(caller)) {
      case (null) { Runtime.trap("User has no tasks") };
      case (?tasks) {
        if (not tasks.containsKey(taskId)) {
          Runtime.trap("Task not found");
        };
        tasks.remove(taskId);
      };
    };
  };

  public shared ({ caller }) func toggleTaskCompletion(taskId : TaskId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can toggle task completion");
    };

    switch (userTasks.get(caller)) {
      case (null) { Runtime.trap("User has no tasks") };
      case (?tasks) {
        switch (tasks.get(taskId)) {
          case (null) { Runtime.trap("Task not found") };
          case (?task) {
            let updatedTask : Task = {
              task with completed = not task.completed;
            };
            tasks.add(taskId, updatedTask);
          };
        };
      };
    };
  };

  public query ({ caller }) func getTasksForDate(date : Date) : async [Task] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tasks");
    };

    switch (userTasks.get(caller)) {
      case (null) { [] };
      case (?tasks) {
        tasks.values().toArray().filter(
          func(task) { task.date == date }
        );
      };
    };
  };

  public query ({ caller }) func getTasksForDateRange(startDate : Date, endDate : Date) : async [Task] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tasks");
    };

    switch (userTasks.get(caller)) {
      case (null) { [] };
      case (?tasks) {
        tasks.values().toArray().filter(
          func(task) {
            task.date >= startDate and task.date <= endDate
          }
        );
      };
    };
  };

  // Category Summary (Snapshots)
  public shared ({ caller }) func saveCategorySummary(summary : CategorySummary) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save category summaries");
    };

    let summaries = switch (userCategorySummaries.get(caller)) {
      case (null) { Map.empty<Date, CategorySummary>() };
      case (?s) { s };
    };

    summaries.add(summary.date, summary);
    userCategorySummaries.add(caller, summaries);
  };

  public query ({ caller }) func getCategorySummary(date : Date) : async ?CategorySummary {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view category summaries");
    };

    switch (userCategorySummaries.get(caller)) {
      case (null) { null };
      case (?summaries) { summaries.get(date) };
    };
  };

  public query ({ caller }) func getCategorySummariesInRange(startDate : Date, endDate : Date) : async [CategorySummary] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view category summaries");
    };

    switch (userCategorySummaries.get(caller)) {
      case (null) { [] };
      case (?summaries) {
        summaries.values().toArray().filter(
          func(summary) {
            summary.date >= startDate and summary.date <= endDate
          }
        );
      };
    };
  };

  // Task Suggestions (Dummy Implementation)
  public query ({ caller }) func getTaskSuggestions() : async [TaskSuggestion] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get suggestions");
    };

    // Suggestion generation will be implemented in the frontend
    // This function serves as a placeholder for the suggestion type
    [];
  };
};
