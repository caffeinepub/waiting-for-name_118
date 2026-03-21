import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
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

  type WheelType = {
    #common;
    #epic;
    #legendary;
  };

  type CategorySummary = {
    category : Text;
    totalTasks : Nat;
    completedTasks : Nat;
    completionPercentage : Float;
    date : Text;
  };

  type Task = {
    id : Nat;
    name : Text;
    category : Category;
    priority : Priority;
    estimatedDuration : Nat;
    date : Text;
    completed : Bool;
    createdAt : Int;
  };

  type UserProfile = {
    name : Text;
    preferences : ?Text;
  };

  type TaskSuggestion = {
    name : Text;
    category : Category;
    priority : Priority;
    estimatedDuration : Nat;
    reason : Text;
  };

  type PremiumStatus = {
    status : { #pending; #approved; #rejected };
    premiumCode : ?Text;
    applied : Bool;
    displayName : ?Text;
    identityCode : Text;
    appliedAt : Int;
    monthlyExpiry : ?Int;
  };

  type WheelData = {
    totalSpinsEarned : Nat;
    totalSpinsUsed : Nat;
    earnedTitles : [Text];
  };

  type OldPublicUserStats = {
    displayName : Text;
    currentStreak : Nat;
    highestStreak : Nat;
    totalTaskCompletions : Nat;
    level : Nat;
  };

  type NewPublicUserStats = {
    displayName : Text;
    currentStreak : Nat;
    highestStreak : Nat;
    totalTaskCompletions : Nat;
    level : Nat;
    activeTitle : ?Text;
  };

  type OldActor = {
    userTasks : Map.Map<Principal, Map.Map<Nat, Task>>;
    userProfiles : Map.Map<Principal, UserProfile>;
    userCategorySummaries : Map.Map<Principal, Map.Map<Text, CategorySummary>>;
    friendLists : Map.Map<Principal, Map.Map<Principal, ()>>;
    friendRequests : Map.Map<Principal, Map.Map<Principal, ()>>;
    publicUserStats : Map.Map<Principal, OldPublicUserStats>;
    premiumStatus : Map.Map<Principal, PremiumStatus>;
    isPremium : Map.Map<Principal, Bool>;
    userWheelData : Map.Map<Principal, WheelData>;
    monthlySubscriptions : Map.Map<Principal, Int>;
    taskSuggestions : [TaskSuggestion];
    universalMasterCode : Text;
    nextTaskId : Nat;
    premiumApplicationsVersion : Nat;
  };

  type NewActor = {
    userTasks : Map.Map<Principal, Map.Map<Nat, Task>>;
    userProfiles : Map.Map<Principal, UserProfile>;
    userCategorySummaries : Map.Map<Principal, Map.Map<Text, CategorySummary>>;
    friendLists : Map.Map<Principal, Map.Map<Principal, ()>>;
    friendRequests : Map.Map<Principal, Map.Map<Principal, ()>>;
    publicUserStats : Map.Map<Principal, NewPublicUserStats>;
    premiumStatus : Map.Map<Principal, PremiumStatus>;
    isPremium : Map.Map<Principal, Bool>;
    userWheelData : Map.Map<Principal, WheelData>;
    monthlySubscriptions : Map.Map<Principal, Int>;
    taskSuggestions : [TaskSuggestion];
    universalMasterCode : Text;
    nextTaskId : Nat;
    premiumApplicationsVersion : Nat;
    userProfilePictures : Map.Map<Principal, Text>;
  };

  public func run(old : OldActor) : NewActor {
    let updatedStats = old.publicUserStats.map<Principal, OldPublicUserStats, NewPublicUserStats>(
      func(_principal, oldStats) {
        {
          oldStats with
          activeTitle = null;
        };
      }
    );
    {
      old with
      publicUserStats = updatedStats;
      userProfilePictures = Map.empty<Principal, Text>();
    };
  };
};
