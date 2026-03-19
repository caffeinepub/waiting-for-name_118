import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Date_ = string;
export interface CategorySummary {
    totalTasks: bigint;
    completedTasks: bigint;
    date: Date_;
    completionPercentage: number;
    category: string;
}
export type TaskId = bigint;
export interface Task {
    id: TaskId;
    date: Date_;
    name: string;
    createdAt: bigint;
    completed: boolean;
    category: Category;
    estimatedDuration: bigint;
    priority: Priority;
}
export interface PublicUserStats {
    displayName: string;
    highestStreak: bigint;
    level: bigint;
    currentStreak: bigint;
    totalTaskCompletions: bigint;
}
export interface UserProfile {
    name: string;
    preferences?: string;
}
export interface TaskSuggestion {
    name: string;
    category: Category;
    estimatedDuration: bigint;
    priority: Priority;
    reason: string;
}
export enum Category {
    social = "social",
    other = "other",
    personalDevelopment = "personalDevelopment",
    work = "work",
    study = "study",
    fitness = "fitness",
    health = "health"
}
export enum Priority {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptFriendRequest(userId: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createTask(name: string, category: Category, priority: Priority, estimatedDuration: bigint, date: Date_, createdAt: bigint): Promise<TaskId>;
    deleteTask(taskId: TaskId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategorySummariesInRange(startDate: Date_, endDate: Date_): Promise<Array<CategorySummary>>;
    getCategorySummary(date: Date_): Promise<CategorySummary | null>;
    getFriendList(): Promise<Array<Principal>>;
    getIncomingRequests(): Promise<Array<Principal>>;
    getOutgoingRequests(): Promise<Array<Principal>>;
    getPublicStatsForUsers(users: Array<Principal>): Promise<Array<[Principal, PublicUserStats]>>;
    getTaskSuggestions(): Promise<Array<TaskSuggestion>>;
    getTasksForDate(date: Date_): Promise<Array<Task>>;
    getTasksForDateRange(startDate: Date_, endDate: Date_): Promise<Array<Task>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeFriend(friendId: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCategorySummary(summary: CategorySummary): Promise<void>;
    sendFriendRequest(userId: Principal): Promise<void>;
    toggleTaskCompletion(taskId: TaskId): Promise<void>;
    updatePublicUserStats(stats: PublicUserStats): Promise<void>;
    updateTask(taskId: TaskId, name: string, category: Category, priority: Priority, estimatedDuration: bigint, date: Date_): Promise<void>;
}
