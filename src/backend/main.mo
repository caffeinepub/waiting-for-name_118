import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type TaskId = Nat;
  type Date = Text;

  public type Category = {
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

  public type Task = {
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

  public type PublicUserStats = {
    displayName : Text;
    currentStreak : Nat;
    highestStreak : Nat;
    totalTaskCompletions : Nat;
    level : Nat;
  };

  var nextTaskId = 0;

  let userTasks = Map.empty<Principal, Map.Map<Nat, Task>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userCategorySummaries = Map.empty<Principal, Map.Map<Date, CategorySummary>>();
  let friendLists = Map.empty<Principal, Map.Map<Principal, ()>>();
  let friendRequests = Map.empty<Principal, Map.Map<Principal, ()>>();
  let publicUserStats = Map.empty<Principal, PublicUserStats>();

  let taskSuggestions : [TaskSuggestion] = [
    // Study suggestions
    {
      name = "Read a chapter from a book";
      category = #study;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Expand your knowledge on a topic";
    },
    {
      name = "Watch an educational video";
      category = #study;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Learn visually about a new concept";
    },
    {
      name = "Practice a new language";
      category = #study;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Improve your communication skills";
    },
    {
      name = "Research a new topic";
      category = #study;
      priority = #high;
      estimatedDuration = 90;
      reason = "Deep dive into unfamiliar subjects";
    },
    {
      name = "Take an online course";
      category = #study;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Structured learning path for a new skill";
    },
    {
      name = "Summarize key learnings";
      category = #study;
      priority = #high;
      estimatedDuration = 30;
      reason = "Better grasp after reading or watching";
    },
    {
      name = "Revise and review past topics";
      category = #study;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Improve retention and understanding";
    },
    {
      name = "Study with a group";
      category = #study;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Collaborative learning environment";
    },
    {
      name = "Create study notes or flashcards";
      category = #study;
      priority = #high;
      estimatedDuration = 30;
      reason = "Strengthen memory and recall";
    },
    {
      name = "Practice coding";
      category = #study;
      priority = #high;
      estimatedDuration = 60;
      reason = "Build technical problem-solving skills";
    },
    {
      name = "Write a practice essay";
      category = #study;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Enhance writing and reasoning abilities";
    },
    {
      name = "Attend a webinar";
      category = #study;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Gain live insights from experts";
    },
    {
      name = "Learn a new software tool";
      category = #study;
      priority = #high;
      estimatedDuration = 90;
      reason = "Increase productivity and technical skills";
    },
    {
      name = "Teach a concept to someone else";
      category = #study;
      priority = #high;
      estimatedDuration = 30;
      reason = "Solidify understanding through teaching";
    },
    {
      name = "Take practice quizzes and assessments";
      category = #study;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Test knowledge and measure progress";
    },

    // Fitness suggestions
    {
      name = "30-minute cardio session";
      category = #fitness;
      priority = #high;
      estimatedDuration = 30;
      reason = "Boost cardiovascular health and energy";
    },
    {
      name = "Strength training workout";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Build muscle and improve strength";
    },
    {
      name = "Yoga and stretching session";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Increase flexibility and reduce stress";
    },
    {
      name = "Outdoor walking or jogging";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Enjoy nature and fresh air";
    },
    {
      name = "Dance class or routine";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Fun full-body workout";
    },
    {
      name = "Balance and coordination exercises";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Improve overall body control";
    },
    {
      name = "Interval training session";
      category = #fitness;
      priority = #high;
      estimatedDuration = 30;
      reason = "Accelerate fitness gains in short time";
    },
    {
      name = "Indoor cycling workout";
      category = #fitness;
      priority = #high;
      estimatedDuration = 45;
      reason = "Intense cardiovascular workout";
    },
    {
      name = "Sports practice (basketball, tennis, etc.)";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Engage in skill-based activities";
    },
    {
      name = "Swimming session";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Low-impact, full-body exercise";
    },
    {
      name = "Brisk walking";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Easily accessible daily activity";
    },
    {
      name = "Fitness class (HIIT, step, pilates)";
      category = #fitness;
      priority = #high;
      estimatedDuration = 60;
      reason = "Variety of exercise styles";
    },
    {
      name = "Jump rope workout";
      category = #fitness;
      priority = #high;
      estimatedDuration = 20;
      reason = "Quick, high-intensity exercise";
    },
    {
      name = "Bodyweight training (squats, pushups, etc.)";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 40;
      reason = "No equipment needed, full-body training";
    },
    {
      name = "Core strengthening session";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Essential for overall fitness";
    },

    // Health suggestions
    {
      name = "Prepare healthy meals";
      category = #health;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Fuel your body with nutritious food";
    },
    {
      name = "Meditation and deep breathing";
      category = #health;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Reduce stress and improve focus";
    },
    {
      name = "Prioritize sleep and rest";
      category = #health;
      priority = #high;
      estimatedDuration = 60;
      reason = "Essential for physical and mental health";
    },
    {
      name = "Daily hydration target";
      category = #health;
      priority = #high;
      estimatedDuration = 15;
      reason = "Vital for overall well-being";
    },
    {
      name = "Attend healthcare appointments";
      category = #health;
      priority = #high;
      estimatedDuration = 60;
      reason = "Routine checkups and preventive care";
    },
    {
      name = "Daily stretching and mobility work";
      category = #health;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Maintain flexibility and prevent injuries";
    },
    {
      name = "Healthy meal planning";
      category = #health;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Support balanced nutrition";
    },
    {
      name = "Mindfulness exercises";
      category = #health;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Increase presence and reduce stress";
    },
    {
      name = "Daily step goals";
      category = #health;
      priority = #high;
      estimatedDuration = 30;
      reason = "Promote physical activity";
    },
    {
      name = "Relaxation activities (reading, music, etc.)";
      category = #health;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Balance activity with relaxation";
    },
    {
      name = "Nutritional supplements";
      category = #health;
      priority = #medium;
      estimatedDuration = 15;
      reason = "Support specific dietary needs";
    },
    {
      name = "Manage stress triggers";
      category = #health;
      priority = #high;
      estimatedDuration = 45;
      reason = "Healthy coping mechanisms";
    },
    {
      name = "Regular wellness checkups";
      category = #health;
      priority = #high;
      estimatedDuration = 60;
      reason = "Preventive healthcare";
    },
    {
      name = "Healthy portion control";
      category = #health;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Support weight management";
    },
    {
      name = "Mindful eating practice";
      category = #health;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Improve digestion and satisfy hunger";
    },

    // Work suggestions
    {
      name = "Deep work session";
      category = #work;
      priority = #high;
      estimatedDuration = 90;
      reason = "Make consistent progress on projects";
    },
    {
      name = "Planning and prioritization";
      category = #work;
      priority = #high;
      estimatedDuration = 45;
      reason = "Set clear objectives and deadlines";
    },
    {
      name = "Focused productivity block";
      category = #work;
      priority = #high;
      estimatedDuration = 60;
      reason = "Complete important, uninterrupted tasks";
    },
    {
      name = "Time blocking technique";
      category = #work;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Increase daily productivity";
    },
    {
      name = "Attend meetings and calls";
      category = #work;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Essential communication and collaboration";
    },
    {
      name = "Project management and tracking";
      category = #work;
      priority = #high;
      estimatedDuration = 60;
      reason = "Stay on top of deadlines and progress";
    },
    {
      name = "Email collection and triage";
      category = #work;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Effective communication management";
    },
    {
      name = "Daily standup or check-in";
      category = #work;
      priority = #medium;
      estimatedDuration = 15;
      reason = "Team communication practice";
    },
    {
      name = "Workspace organization";
      category = #work;
      priority = #high;
      estimatedDuration = 30;
      reason = "Reduce distractions and increase efficiency";
    },
    {
      name = "Lunch breaks and rest periods";
      category = #work;
      priority = #high;
      estimatedDuration = 30;
      reason = "Maintain focus and productivity";
    },
    {
      name = "Documentation and note-taking";
      category = #work;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Reference future work and improve records";
    },
    {
      name = "Professional development (training, research)";
      category = #work;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Expand skills relevant to your field";
    },
    {
      name = "Collaborative working sessions";
      category = #work;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Leverage team strengths";
    },
    {
      name = "Meeting agenda preparation";
      category = #work;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Facilitate efficient, focused meetings";
    },
    {
      name = "Progress review and reflection";
      category = #work;
      priority = #high;
      estimatedDuration = 30;
      reason = "Maintain growth-oriented work habits";
    },

    // Personal Development suggestions
    {
      name = "Journal about your progress";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 15;
      reason = "Increase self-awareness and reflect";
    },
    {
      name = "Set new objectives";
      category = #personalDevelopment;
      priority = #high;
      estimatedDuration = 30;
      reason = "Improve motivation with life direction";
    },
    {
      name = "Personal growth reading";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Expand perspectives and deep insights";
    },
    {
      name = "Structured planning";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Increase intentional success";
    },
    {
      name = "Practice gratitude";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Improve overall mindset and well-being";
    },
    {
      name = "Identify personal values";
      category = #personalDevelopment;
      priority = #high;
      estimatedDuration = 45;
      reason = "Make better decisions aligned with values";
    },
    {
      name = "Take personality tests";
      category = #personalDevelopment;
      priority = #high;
      estimatedDuration = 30;
      reason = "Understanding strengths and weaknesses";
    },
    {
      name = "Practice meditation";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Increase emotional intelligence";
    },
    {
      name = "Weekly review and planning";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Build positive long-term habits";
    },
    {
      name = "Read self-improvement books";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Strengthen mindset and skills";
    },
    {
      name = "Volunteer for local organization";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Grow character and positive impact";
    },
    {
      name = "Track daily habits";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Cultivate a growth-oriented mindset";
    },
    {
      name = "Emotional intelligence practice";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Improve communication and resilience";
    },
    {
      name = "Reading challenge (book a month)";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Broader perspectives and thinking";
    },
    {
      name = "Creative self-expression (art, music, writing)";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Boost self-discovery and connection";
    },

    // Social suggestions
    {
      name = "Connect with friends and family";
      category = #social;
      priority = #low;
      estimatedDuration = 30;
      reason = "Maintain meaningful relationships";
    },
    {
      name = "Attend social events";
      category = #social;
      priority = #low;
      estimatedDuration = 60;
      reason = "Expand social circle and engagement";
    },
    {
      name = "Regular check-ins";
      category = #social;
      priority = #low;
      estimatedDuration = 20;
      reason = "Strengthen relationships";
    },
    {
      name = "Volunteer for community service";
      category = #social;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Support causes and make an impact";
    },
    {
      name = "Plan collaborative activities (games, cooking)";
      category = #social;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Participate in joint projects";
    },
    {
      name = "Host gatherings or events";
      category = #social;
      priority = #low;
      estimatedDuration = 60;
      reason = "Strengthen connections";
    },
    {
      name = "Attend cultural events";
      category = #social;
      priority = #low;
      estimatedDuration = 60;
      reason = "Increase cultural awareness";
    },
    {
      name = "Support friend or family career goals";
      category = #social;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Encourage mutual growth";
    },
    {
      name = "Take dance or music lessons";
      category = #social;
      priority = #low;
      estimatedDuration = 90;
      reason = "Engage in collaborative creative activities";
    },
    {
      name = "Explore new restaurants or cafes";
      category = #social;
      priority = #low;
      estimatedDuration = 60;
      reason = "Share fun experiences";
    },
    {
      name = "Exercise and wellness together";
      category = #social;
      priority = #low;
      estimatedDuration = 60;
      reason = "Promote holistic health";
    },
    {
      name = "Build shared traditions";
      category = #social;
      priority = #low;
      estimatedDuration = 45;
      reason = "Strengthen relationships and memories";
    },
    {
      name = "Participate in social clubs or groups";
      category = #social;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Shared interests and activities";
    },
    {
      name = "Share and recommend resources";
      category = #social;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Exchange helpful information";
    },
    {
      name = "Monthly gatherings or events";
      category = #social;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Strengthen relationships through consistency";
    },

    // Other suggestions
    {
      name = "Pay bills and manage finances";
      category = #other;
      priority = #high;
      estimatedDuration = 30;
      reason = "Essential for financial health";
    },
    {
      name = "Grocery and shopping planning";
      category = #other;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Support healthy eating and preparation";
    },
    {
      name = "Organize home and workspace";
      category = #other;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Increase daily productivity";
    },
    {
      name = "House cleaning and maintenance";
      category = #other;
      priority = #high;
      estimatedDuration = 30;
      reason = "Promote a comfortable living space";
    },
    {
      name = "Exercise and movement patterns";
      category = #other;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Support overall wellness";
    },
    {
      name = "Meal preplanning and nutrition";
      category = #other;
      priority = #high;
      estimatedDuration = 60;
      reason = "Save time and improve health";
    },
    {
      name = "Establish weekly routines";
      category = #other;
      priority = #high;
      estimatedDuration = 30;
      reason = "Create structure and consistency";
    },
    {
      name = "Plan for personal development";
      category = #other;
      priority = #high;
      estimatedDuration = 45;
      reason = "Increase intentional living";
    },
    {
      name = "Community engagement";
      category = #other;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Stronger sense of belonging";
    },
    {
      name = "Creative expression";
      category = #other;
      priority = #low;
      estimatedDuration = 60;
      reason = "Supports emotional well-being";
    },
    {
      name = "Regular device backups";
      category = #other;
      priority = #high;
      estimatedDuration = 30;
      reason = "Maintain digital security";
    },
    {
      name = "Monthly planning";
      category = #other;
      priority = #high;
      estimatedDuration = 60;
      reason = "Optimize productivity";
    },
    {
      name = "Review financial statements";
      category = #other;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Improve financial literacy";
    },
    {
      name = "Annual healthcare appointments";
      category = #other;
      priority = #high;
      estimatedDuration = 60;
      reason = "Promote long-term well-being";
    },
    {
      name = "Review travel plans";
      category = #other;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Plan for adventure and relaxation";
    },
  ];

  module Task {
    public func compare(task1 : Task, task2 : Task) : Nat {
      if (task1.id < task2.id) { 0 } else {
        if (task1.id > task2.id) { 1 } else { 2 };
      };
    };
  };

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

  public shared ({ caller }) func getTaskSuggestions() : async [TaskSuggestion] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get suggestions");
    };

    let seed = Time.now();

    let taskArray = taskSuggestions.toVarArray<TaskSuggestion>();
    let n = taskArray.size();

    var i = n - 1;
    while (i > 0) {
      let j = (seed.toNat() + i) % n;
      let temp = taskArray[i];
      taskArray[i] := taskArray[j];
      taskArray[j] := temp;
      i -= 1;
    };

    taskArray.toArray();
  };

  ////// FRRIEND SYSTEM SECTION ///////
  public query ({ caller }) func getFriendList() : async [Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view friends");
    };
    switch (friendLists.get(caller)) {
      case (null) { [] };
      case (?map) { map.keys().toArray() };
    };
  };

  public query ({ caller }) func getIncomingRequests() : async [Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view requests");
    };
    switch (friendRequests.get(caller)) {
      case (null) { [] };
      case (?map) { map.keys().toArray() };
    };
  };

  public query ({ caller }) func getOutgoingRequests() : async [Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view outgoing requests");
    };
    var outgoing : [Principal] = [];
    for ((userId, requests) in friendRequests.entries()) {
      if (requests.containsKey(caller)) {
        outgoing := outgoing.concat([userId]);
      };
    };
    outgoing;
  };

  public shared ({ caller }) func sendFriendRequest(userId : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send requests");
    };

    if (caller == userId) {
      Runtime.trap("Cannot send request to yourself");
    };

    // Check if already friends
    switch (friendLists.get(caller)) {
      case (?map) {
        if (map.containsKey(userId)) {
          Runtime.trap("Already friends");
        };
      };
      case (null) {};
    };

    // Add friend request
    let requests = switch (friendRequests.get(userId)) {
      case (null) { Map.empty<Principal, ()>() };
      case (?existing) { existing };
    };

    // Check if already friend request
    if (requests.containsKey(caller)) {
      Runtime.trap("Request already sent");
    };

    requests.add(caller, ());
    friendRequests.add(userId, requests);
  };

  public shared ({ caller }) func acceptFriendRequest(userId : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can accept requests");
    };

    // Check if both users have sent requests to each other
    switch (friendRequests.get(caller)) {
      case (null) { Runtime.trap("No requests to accept") };
      case (?requests) {
        if (not requests.containsKey(userId)) {
          Runtime.trap("No pending request from this user");
        };

        // Remove requests from both sides
        requests.remove(userId);
        friendRequests.add(caller, requests);

        // Add to each other's friends lists
        let callerFriends = switch (friendLists.get(caller)) {
          case (null) { Map.empty<Principal, ()>() };
          case (?existing) { existing };
        };
        callerFriends.add(userId, ());
        friendLists.add(caller, callerFriends);

        let userFriends = switch (friendLists.get(userId)) {
          case (null) { Map.empty<Principal, ()>() };
          case (?existing) { existing };
        };
        userFriends.add(caller, ());
        friendLists.add(userId, userFriends);
      };
    };
  };

  public shared ({ caller }) func removeFriend(friendId : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove friends");
    };

    switch (friendLists.get(caller)) {
      case (null) { Runtime.trap("No friends to remove") };
      case (?friends) {
        if (not friends.containsKey(friendId)) {
          Runtime.trap("Not friends with this user");
        };
        friends.remove(friendId);
        friendLists.add(caller, friends);

        switch (friendLists.get(friendId)) {
          case (null) {};
          case (?friends) {
            friends.remove(caller);
            friendLists.add(friendId, friends);
          };
        };
      };
    };
  };

  public shared ({ caller }) func updatePublicUserStats(stats : PublicUserStats) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update stats");
    };
    publicUserStats.add(caller, stats);
  };

  public query ({ caller }) func getPublicStatsForUsers(users : [Principal]) : async [(Principal, PublicUserStats)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch stats");
    };

    users.filterMap(
      func(user) {
        switch (publicUserStats.get(user)) {
          case (null) { null };
          case (?stats) { ?(user, stats) };
        };
      }
    );
  };
};
