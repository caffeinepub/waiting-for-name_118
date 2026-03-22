import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Time "mo:core/Time";


import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";


actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Category = {
    #study;
    #fitness;
    #health;
    #work;
    #personalDevelopment;
    #social;
    #other;
  };

  public type Priority = {
    #low;
    #medium;
    #high;
  };

  public type WheelType = {
    #common;
    #epic;
    #legendary;
  };

  public type CategorySummary = {
    category : Text;
    totalTasks : Nat;
    completedTasks : Nat;
    completionPercentage : Float;
    date : Text;
  };

  public type Task = {
    id : Nat;
    name : Text;
    category : Category;
    priority : Priority;
    estimatedDuration : Nat;
    date : Text;
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
    activeTitle : ?Text;
  };

  public type PremiumStatus = {
    status : { #pending; #approved; #rejected };
    premiumCode : ?Text;
    applied : Bool;
    displayName : ?Text;
    identityCode : Text;
    appliedAt : Int;
    monthlyExpiry : ?Int;
  };

  public type WheelData = {
    totalSpinsEarned : Nat;
    totalSpinsUsed : Nat;
    earnedTitles : [Text];
  };

  let universalMasterCode = "GRIND-MASTER-2026";
  var nextTaskId = 0;
  var premiumApplicationsVersion = 0;

  let userTasks = Map.empty<Principal, Map.Map<Nat, Task>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userCategorySummaries = Map.empty<Principal, Map.Map<Text, CategorySummary>>();
  let friendLists = Map.empty<Principal, Map.Map<Principal, ()>>();
  let friendRequests = Map.empty<Principal, Map.Map<Principal, ()>>();
  let publicUserStats = Map.empty<Principal, PublicUserStats>();
  let premiumStatus = Map.empty<Principal, PremiumStatus>();
  let isPremium = Map.empty<Principal, Bool>();
  let userWheelData = Map.empty<Principal, WheelData>();
  let userProfilePictures = Map.empty<Principal, Text>();

  let monthlySubscriptions = Map.empty<Principal, Int>();

  let commonTitles : [Text] = [
    "Rookie Grinder",
    "Task Tackler",
    "Daily Doer",
    "Habit Builder",
    "Consistency Starter",
    "Early Bird",
    "The Newcomer",
    "Grind Initiate",
    "First Steps",
    "Getting Started",
  ];

  let epicTitles : [Text] = [
    "Streak Machine",
    "Dominator",
    "Long Time Fan",
    "New Blood",
    "Task Master",
    "Focus Warrior",
    "Productivity Pro",
    "Challenge Accepted",
    "The Grinder",
    "Momentum Builder",
  ];

  let legendaryTitles : [Text] = [
    "Consistency God",
    "Elite Grinder",
    "Unstoppable Force",
    "Legend",
    "Titan of Grind",
    "Supreme Achiever",
    "The Relentless",
    "Apex Performer",
    "Grind Master",
    "Immortal Grinder",
  ];

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
    {
      name = "Study mathematics and problem-solving";
      category = #study;
      priority = #high;
      estimatedDuration = 60;
      reason = "Build analytical thinking skills";
    },
    {
      name = "Read scientific articles";
      category = #study;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Stay updated with latest research";
    },
    {
      name = "Practice speed reading";
      category = #study;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Process information faster";
    },
    {
      name = "Complete online certification module";
      category = #study;
      priority = #high;
      estimatedDuration = 90;
      reason = "Work toward professional credentials";
    },
    {
      name = "Mind-map a complex topic";
      category = #study;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Visualize and connect ideas";
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
    {
      name = "Rock climbing or bouldering";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 90;
      reason = "Full body strength and mental challenge";
    },
    {
      name = "Martial arts practice";
      category = #fitness;
      priority = #high;
      estimatedDuration = 60;
      reason = "Discipline, strength, and self-defense";
    },
    {
      name = "Flexibility routine";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Prevent injuries and improve range of motion";
    },
    {
      name = "Hiking or trail walk";
      category = #fitness;
      priority = #medium;
      estimatedDuration = 120;
      reason = "Connect with nature while staying active";
    },
    {
      name = "Sprint intervals";
      category = #fitness;
      priority = #high;
      estimatedDuration = 20;
      reason = "Maximize calorie burn in minimal time";
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
    {
      name = "Digital detox hour";
      category = #health;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Rest your eyes and mental clarity";
    },
    {
      name = "Cold shower therapy";
      category = #health;
      priority = #medium;
      estimatedDuration = 10;
      reason = "Boost alertness and circulation";
    },
    {
      name = "Journaling for mental health";
      category = #health;
      priority = #medium;
      estimatedDuration = 20;
      reason = "Process emotions and thoughts";
    },
    {
      name = "Eye care exercises";
      category = #health;
      priority = #low;
      estimatedDuration = 10;
      reason = "Reduce eye strain from screens";
    },
    {
      name = "Nature walk for mental reset";
      category = #health;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Restore focus and reduce anxiety";
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
    {
      name = "Pomodoro technique session";
      category = #work;
      priority = #high;
      estimatedDuration = 25;
      reason = "Boost focus with timed work blocks";
    },
    {
      name = "Networking and relationship building";
      category = #work;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Expand professional connections";
    },
    {
      name = "Creative brainstorming session";
      category = #work;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Generate new ideas and solutions";
    },
    {
      name = "Review and respond to feedback";
      category = #work;
      priority = #high;
      estimatedDuration = 30;
      reason = "Improve quality and relationships";
    },
    {
      name = "Portfolio or resume update";
      category = #work;
      priority = #medium;
      estimatedDuration = 45;
      reason = "Keep professional profile current";
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
    {
      name = "Life audit and goal review";
      category = #personalDevelopment;
      priority = #high;
      estimatedDuration = 60;
      reason = "Align actions with long-term vision";
    },
    {
      name = "Public speaking practice";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Build confidence and communication";
    },
    {
      name = "Learn a new hobby";
      category = #personalDevelopment;
      priority = #low;
      estimatedDuration = 60;
      reason = "Expand life experiences and joy";
    },
    {
      name = "Declutter digital life";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Mental clarity through organization";
    },
    {
      name = "Practice visualization";
      category = #personalDevelopment;
      priority = #medium;
      estimatedDuration = 15;
      reason = "Strengthen goal focus and motivation";
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
    {
      name = "Write thoughtful messages to loved ones";
      category = #social;
      priority = #low;
      estimatedDuration = 20;
      reason = "Express care and appreciation";
    },
    {
      name = "Mentor someone younger";
      category = #social;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Share experience and give back";
    },
    {
      name = "Reconnect with old friends";
      category = #social;
      priority = #low;
      estimatedDuration = 30;
      reason = "Revive valuable relationships";
    },
    {
      name = "Active listening practice";
      category = #social;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Improve empathy and relationships";
    },
    {
      name = "Conflict resolution conversation";
      category = #social;
      priority = #high;
      estimatedDuration = 45;
      reason = "Maintain healthy relationships";
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
    {
      name = "Car maintenance check";
      category = #other;
      priority = #medium;
      estimatedDuration = 30;
      reason = "Prevent unexpected breakdowns";
    },
    {
      name = "Emergency preparedness review";
      category = #other;
      priority = #high;
      estimatedDuration = 30;
      reason = "Ensure family safety";
    },
    {
      name = "Side project work session";
      category = #other;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Progress on passion projects";
    },
    {
      name = "Research investments or savings";
      category = #other;
      priority = #high;
      estimatedDuration = 45;
      reason = "Build long-term financial security";
    },
    {
      name = "Declutter and donate items";
      category = #other;
      priority = #medium;
      estimatedDuration = 60;
      reason = "Create space and help others";
    },
  ];

  func verifyUserAccess(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access this data");
    };
  };

  func verifyAdminAccess(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can access this data");
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    verifyUserAccess(caller);
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    verifyUserAccess(caller);
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createTask(
    name : Text,
    category : Category,
    priority : Priority,
    estimatedDuration : Nat,
    date : Text,
    createdAt : Int,
  ) : async Nat {
    verifyUserAccess(caller);
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
    taskId : Nat,
    name : Text,
    category : Category,
    priority : Priority,
    estimatedDuration : Nat,
    date : Text,
  ) : async () {
    verifyUserAccess(caller);
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

  public shared ({ caller }) func deleteTask(taskId : Nat) : async () {
    verifyUserAccess(caller);
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

  public shared ({ caller }) func toggleTaskCompletion(taskId : Nat) : async () {
    verifyUserAccess(caller);
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

  public query ({ caller }) func getTasksForDate(date : Text) : async [Task] {
    verifyUserAccess(caller);
    switch (userTasks.get(caller)) {
      case (null) { [] };
      case (?tasks) {
        tasks.values().toArray().filter(
          func(task) { task.date == date }
        );
      };
    };
  };

  public query ({ caller }) func getTasksForDateRange(startDate : Text, endDate : Text) : async [Task] {
    verifyUserAccess(caller);
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
    verifyUserAccess(caller);
    let summaries = switch (userCategorySummaries.get(caller)) {
      case (null) { Map.empty<Text, CategorySummary>() };
      case (?s) { s };
    };
    summaries.add(summary.date, summary);
    userCategorySummaries.add(caller, summaries);
  };

  public query ({ caller }) func getCategorySummary(date : Text) : async ?CategorySummary {
    verifyUserAccess(caller);
    switch (userCategorySummaries.get(caller)) {
      case (null) { null };
      case (?summaries) { summaries.get(date) };
    };
  };

  public query ({ caller }) func getCategorySummariesInRange(startDate : Text, endDate : Text) : async [CategorySummary] {
    verifyUserAccess(caller);
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
    verifyUserAccess(caller);
    let seedInt : Int = Time.now();
    let seed : Nat = if (seedInt >= 0) { seedInt.toNat() } else { 0 };
    let taskArray = taskSuggestions.toVarArray<TaskSuggestion>();
    let n = taskArray.size();
    var i = n - 1;
    while (i > 0) {
      let j = (seed + i) % n;
      let temp = taskArray[i];
      taskArray[i] := taskArray[j];
      taskArray[j] := temp;
      i -= 1;
    };
    taskArray.toArray();
  };

  public query ({ caller }) func getFriendList() : async [Principal] {
    verifyUserAccess(caller);
    switch (friendLists.get(caller)) {
      case (null) { [] };
      case (?map) { map.keys().toArray() };
    };
  };

  public query ({ caller }) func getIncomingRequests() : async [Principal] {
    verifyUserAccess(caller);
    switch (friendRequests.get(caller)) {
      case (null) { [] };
      case (?map) { map.keys().toArray() };
    };
  };

  public query ({ caller }) func getOutgoingRequests() : async [Principal] {
    verifyUserAccess(caller);
    var outgoing : [Principal] = [];
    for ((userId, requests) in friendRequests.entries()) {
      if (requests.containsKey(caller)) {
        outgoing := outgoing.concat([userId]);
      };
    };
    outgoing;
  };

  public shared ({ caller }) func sendFriendRequest(userId : Principal) : async () {
    verifyUserAccess(caller);
    if (caller == userId) {
      Runtime.trap("Cannot send request to yourself");
    };
    switch (friendLists.get(caller)) {
      case (?map) {
        if (map.containsKey(userId)) {
          Runtime.trap("Already friends");
        };
      };
      case (null) {};
    };
    let requests = switch (friendRequests.get(userId)) {
      case (null) { Map.empty<Principal, ()>() };
      case (?existing) { existing };
    };
    if (requests.containsKey(caller)) {
      Runtime.trap("Request already sent");
    };
    requests.add(caller, ());
    friendRequests.add(userId, requests);
  };

  public shared ({ caller }) func acceptFriendRequest(userId : Principal) : async () {
    verifyUserAccess(caller);
    switch (friendRequests.get(caller)) {
      case (null) { Runtime.trap("No requests to accept") };
      case (?requests) {
        if (not requests.containsKey(userId)) {
          Runtime.trap("No pending request from this user");
        };
        requests.remove(userId);
        friendRequests.add(caller, requests);
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
    verifyUserAccess(caller);
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
    verifyUserAccess(caller);
    let totalEarned = stats.highestStreak / 10;
    let existing = switch (userWheelData.get(caller)) {
      case (null) { { totalSpinsEarned = 0; totalSpinsUsed = 0; earnedTitles = [] } };
      case (?d) { d };
    };
    if (totalEarned > existing.totalSpinsEarned) {
      userWheelData.add(caller, { existing with totalSpinsEarned = totalEarned });
    };
    let existingStats : ?PublicUserStats = publicUserStats.get(caller);
    let statsWithActiveTitle = switch (existingStats) {
      case (null) { { stats with activeTitle = null } };
      case (?existing) { { stats with activeTitle = existing.activeTitle } };
    };
    publicUserStats.add(caller, statsWithActiveTitle);
  };

  public shared ({ caller }) func setActiveTitle(title : Text) : async () {
    verifyUserAccess(caller);
    switch (publicUserStats.get(caller)) {
      case (null) { Runtime.trap("User stats not found") };
      case (?stats) {
        let updatedStats : PublicUserStats = {
          stats with activeTitle = ?title
        };
        publicUserStats.add(caller, updatedStats);
      };
    };
  };

  public query ({ caller }) func getActiveTitle(user : Principal) : async ?Text {
    verifyUserAccess(caller);
    switch (publicUserStats.get(user)) {
      case (null) { null };
      case (?stats) { stats.activeTitle };
    };
  };

  public query ({ caller }) func getPublicStatsForUsers(users : [Principal]) : async [(Principal, PublicUserStats)] {
    verifyUserAccess(caller);
    users.filterMap(
      func(user) {
        switch (publicUserStats.get(user)) {
          case (null) { null };
          case (?stats) { ?(user, stats) };
        };
      }
    );
  };

  public query ({ caller }) func getEarnedTitlesForUsers(users : [Principal]) : async [(Principal, [Text])] {
    verifyUserAccess(caller);
    users.filterMap(
      func(user) {
        switch (userWheelData.get(user)) {
          case (null) { ?(user, []) };
          case (?wd) { ?(user, wd.earnedTitles) };
        };
      }
    );
  };

  public query ({ caller }) func getMyWheelData() : async WheelData {
    verifyUserAccess(caller);
    switch (userWheelData.get(caller)) {
      case (null) { { totalSpinsEarned = 0; totalSpinsUsed = 0; earnedTitles = [] } };
      case (?d) { d };
    };
  };

  public shared ({ caller }) func spinWheel(wheelType : WheelType) : async Text {
    verifyUserAccess(caller);
    let existing = switch (userWheelData.get(caller)) {
      case (null) { { totalSpinsEarned = 0; totalSpinsUsed = 0; earnedTitles = [] } };
      case (?d) { d };
    };
    let available = if (existing.totalSpinsEarned >= existing.totalSpinsUsed) { existing.totalSpinsEarned - existing.totalSpinsUsed } else { 0 };
    let cost : Nat = switch (wheelType) {
      case (#common) { 1 };
      case (#epic) { 2 };
      case (#legendary) { 3 };
    };
    if (available < cost) {
      Runtime.trap("Not enough free spins");
    };
    let pool : [Text] = switch (wheelType) {
      case (#common) { commonTitles };
      case (#epic) { epicTitles };
      case (#legendary) { legendaryTitles };
    };
    let timeVal : Int = Time.now();
    let timeNat : Nat = if (timeVal >= 0) { timeVal.toNat() } else { 0 };
    let seed = (timeNat + existing.totalSpinsUsed) % pool.size();
    let wonTitle = pool[seed];
    var alreadyHas = false;
    for (t in existing.earnedTitles.vals()) {
      if (t == wonTitle) { alreadyHas := true };
    };
    let newTitles = if (alreadyHas) { existing.earnedTitles } else { existing.earnedTitles.concat([wonTitle]) };
    userWheelData.add(caller, {
      totalSpinsEarned = existing.totalSpinsEarned;
      totalSpinsUsed = existing.totalSpinsUsed + cost;
      earnedTitles = newTitles;
    });
    wonTitle;
  };

  public query ({ caller }) func getEarnedTitlesForUser(user : Principal) : async [Text] {
    verifyUserAccess(caller);
    switch (userWheelData.get(user)) {
      case (null) { [] };
      case (?d) { d.earnedTitles };
    };
  };

  // Profile picture management - no auth required per spec
  public shared ({ caller }) func setProfilePicture(url : Text) : async () {
    verifyUserAccess(caller);
    userProfilePictures.add(caller, url);
  };

  // Public access - anyone can view profile pictures per spec
  public query func getProfilePicture(user : Principal) : async ?Text {
    userProfilePictures.get(user);
  };

  /////////// PREMIUM SECTION ///////////

  func createIdentityCode(p : Principal) : Text {
    let principalText = p.toText();
    var sum = 0;
    for (char in principalText.chars()) {
      sum += char.toNat32().toNat();
    };
    let formattedSum = formatFourDigits(sum % 10000);
    "GT-ABCD-" # formattedSum;
  };

  func formatFourDigits(n : Nat) : Text {
    let firstDigit = (n / 1000).toText();
    let secondDigit = ((n % 1000) / 100).toText();
    let thirdDigit = ((n % 100) / 10).toText();
    let fourthDigit = (n % 10).toText();
    firstDigit # secondDigit # thirdDigit # fourthDigit;
  };

  public shared ({ caller }) func applyForPremium(displayName : Text) : async () {
    verifyUserAccess(caller);
    switch (premiumStatus.get(caller)) {
      case (?existing) {
        if (existing.applied) {
          switch (existing.status) {
            case (#pending) {
              Runtime.trap("Premium already applied for");
            };
            case (#approved) {
              Runtime.trap("Already approved for premium");
            };
            case (#rejected) {};
          };
        };
      };
      case (null) {};
    };
    let premium : PremiumStatus = {
      status = #pending;
      premiumCode = null;
      applied = true;
      displayName = ?displayName;
      identityCode = createIdentityCode(caller);
      appliedAt = Time.now();
      monthlyExpiry = null;
    };
    premiumStatus.add(caller, premium);
    premiumApplicationsVersion += 1;
  };

  public shared ({ caller }) func approvePremium(applicant : Principal) : async Text {
    verifyAdminAccess(caller);
    switch (premiumStatus.get(applicant)) {
      case (null) { Runtime.trap("No application found") };
      case (?existing) {
        if (not existing.applied) {
          Runtime.trap("Applicant never applied for premium");
        };
        let newPremiumCode = "GT-PRM" # createIdentityCode(applicant);
        let premium : PremiumStatus = {
          existing with
          status = #approved;
          premiumCode = ?newPremiumCode;
          applied = true;
        };
        premiumStatus.add(applicant, premium);
        premiumApplicationsVersion += 1;
        newPremiumCode;
      };
    };
  };

  public shared ({ caller }) func rejectPremium(applicant : Principal) : async () {
    verifyAdminAccess(caller);
    switch (premiumStatus.get(applicant)) {
      case (null) { Runtime.trap("No application found") };
      case (?existing) {
        if (not existing.applied) {
          Runtime.trap("Applicant never applied for premium");
        };
        let premium : PremiumStatus = {
          existing with status = #rejected
        };
        premiumStatus.add(applicant, premium);
        premiumApplicationsVersion += 1;
      };
    };
  };

  public query ({ caller }) func getAllPremiumApplications() : async [(Principal, PremiumStatus)] {
    verifyAdminAccess(caller);
    premiumStatus.toArray();
  };

  public query ({ caller }) func getMyPremiumApplication() : async ?PremiumStatus {
    verifyUserAccess(caller);
    premiumStatus.get(caller);
  };

  public query ({ caller }) func isCallerPremium() : async Bool {
    // Check permanent premium status
    let hasPermanentPremium = switch (isPremium.get(caller)) {
      case (null) { false };
      case (?status) { status };
    };

    // Check monthly subscription status
    let hasActiveMonthly = switch (monthlySubscriptions.get(caller)) {
      case (null) { false };
      case (?expiry) { Time.now() < expiry };
    };

    // Return true if either is active
    hasPermanentPremium or hasActiveMonthly;
  };

  public query ({ caller }) func getUniversalMasterCode() : async Text {
    verifyAdminAccess(caller);
    universalMasterCode;
  };

  public shared ({ caller }) func redeemPremiumCode(code : Text) : async Bool {
    verifyUserAccess(caller);
    if (code == universalMasterCode) {
      isPremium.add(caller, true);
      return true;
    };
    switch (premiumStatus.get(caller)) {
      case (?premium) {
        switch (premium.premiumCode) {
          case (?userCode) {
            if (code == userCode) {
              isPremium.add(caller, true);
              return true;
            };
          };
          case (null) {};
        };
      };
      case (null) {};
    };
    false;
  };

  public query ({ caller }) func getMyIdentityCode() : async Text {
    verifyUserAccess(caller);
    switch (premiumStatus.get(caller)) {
      case (?existing) { existing.identityCode };
      case (null) { createIdentityCode(caller) };
    };
  };

  public query ({ caller }) func getUserIdentityCode(user : Principal) : async Text {
    verifyAdminAccess(caller);
    switch (premiumStatus.get(user)) {
      case (?existing) { existing.identityCode };
      case (null) { createIdentityCode(user) };
    };
  };

  public query ({ caller }) func isUserPremium(user : Principal) : async Bool {
    verifyAdminAccess(caller);
    switch (isPremium.get(user)) {
      case (null) { false };
      case (?status) { status };
    };
  };

  public query ({ caller }) func getPremiumApplicationsSummary() : async (Nat, [(Principal, PremiumStatus)]) {
    verifyAdminAccess(caller);
    (premiumApplicationsVersion, premiumStatus.toArray());
  };

  public query ({ caller }) func getPremiumStatus(user : Principal) : async ?PremiumStatus {
    verifyAdminAccess(caller);
    premiumStatus.get(user);
  };

  public shared ({ caller }) func requestPremiumStatus() : async () {
    verifyUserAccess(caller);
    let newPremium : PremiumStatus = {
      status = #pending;
      premiumCode = null;
      applied = true;
      displayName = null;
      identityCode = createIdentityCode(caller);
      appliedAt = Time.now();
      monthlyExpiry = null;
    };
    premiumStatus.add(caller, newPremium);
    premiumApplicationsVersion += 1;
  };

  // MONTHLY SUBSCRIPTION FUNCTIONS

  public shared ({ caller }) func grantMonthlyAccess(user : Principal, months : Nat) : async () {
    verifyAdminAccess(caller);
    let currentTime = Time.now();
    let additionalTime = months * 30 * 24 * 60 * 60 * 1_000_000_000;
    let newExpiry = currentTime + additionalTime;
    monthlySubscriptions.add(user, newExpiry);
  };

  public shared ({ caller }) func revokeMonthlyAccess(user : Principal) : async () {
    verifyAdminAccess(caller);
    monthlySubscriptions.remove(user);
  };

  public query ({ caller }) func isCallerMonthlyActive() : async Bool {
    switch (monthlySubscriptions.get(caller)) {
      case (null) { false };
      case (?expiry) { Time.now() < expiry };
    };
  };

  public query ({ caller }) func getAllMonthlySubscriptions() : async [(Principal, Int)] {
    verifyAdminAccess(caller);
    monthlySubscriptions.toArray();
  };

  public query ({ caller }) func getUserMonthlyExpiry(user : Principal) : async ?Int {
    verifyAdminAccess(caller);
    monthlySubscriptions.get(user);
  };

  public type FriendPublicProfile = {
    displayName : Text;
    currentStreak : Nat;
    highestStreak : Nat;
    totalTaskCompletions : Nat;
    level : Nat;
    activeTitle : ?Text;
    earnedTitles : [Text];
    profilePictureUrl : ?Text;
  };

  // Public access - anyone can view friend profiles per spec
  public query func getFriendPublicProfile(friend : Principal) : async ?FriendPublicProfile {
    let stats = publicUserStats.get(friend);
    let wheelData = userWheelData.get(friend);
    let picture = userProfilePictures.get(friend);

    switch (stats, wheelData) {
      case (null, _) { null };
      case (_, null) { null };
      case (?s, ?w) {
        ?{
          displayName = s.displayName;
          currentStreak = s.currentStreak;
          highestStreak = s.highestStreak;
          totalTaskCompletions = s.totalTaskCompletions;
          level = s.level;
          activeTitle = s.activeTitle;
          earnedTitles = w.earnedTitles;
          profilePictureUrl = picture;
        };
      };
    };
  };
};
