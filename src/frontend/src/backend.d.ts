import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CategorySummary {
    totalTasks: bigint;
    completedTasks: bigint;
    date: string;
    completionPercentage: number;
    category: string;
}
export interface Task {
    id: bigint;
    date: string;
    name: string;
    createdAt: bigint;
    completed: boolean;
    category: Category;
    estimatedDuration: bigint;
    priority: Priority;
}
export interface FriendPublicProfile {
    displayName: string;
    earnedTitles: Array<string>;
    highestStreak: bigint;
    activeTitle?: string;
    level: bigint;
    profilePictureUrl?: string;
    currentStreak: bigint;
    totalTaskCompletions: bigint;
}
export interface TaskSuggestion {
    name: string;
    category: Category;
    estimatedDuration: bigint;
    priority: Priority;
    reason: string;
}
export interface PremiumStatus {
    identityCode: string;
    status: Variant_pending_approved_rejected;
    appliedAt: bigint;
    monthlyExpiry?: bigint;
    displayName?: string;
    applied: boolean;
    premiumCode?: string;
}
export interface WheelData {
    totalSpinsUsed: bigint;
    earnedTitles: Array<string>;
    totalSpinsEarned: bigint;
}
export interface PublicUserStats {
    displayName: string;
    highestStreak: bigint;
    activeTitle?: string;
    level: bigint;
    currentStreak: bigint;
    totalTaskCompletions: bigint;
}
export interface UserProfile {
    name: string;
    preferences?: string;
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
export enum Variant_pending_approved_rejected {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum WheelType {
    epic = "epic",
    legendary = "legendary",
    common = "common"
}
export interface backendInterface {
    acceptFriendRequest(userId: Principal): Promise<void>;
    applyForPremium(displayName: string): Promise<void>;
    approvePremium(applicant: Principal): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createTask(name: string, category: Category, priority: Priority, estimatedDuration: bigint, date: string, createdAt: bigint): Promise<bigint>;
    deleteTask(taskId: bigint): Promise<void>;
    getActiveTitle(user: Principal): Promise<string | null>;
    getAllMonthlySubscriptions(): Promise<Array<[Principal, bigint]>>;
    getAllPremiumApplications(): Promise<Array<[Principal, PremiumStatus]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategorySummariesInRange(startDate: string, endDate: string): Promise<Array<CategorySummary>>;
    getCategorySummary(date: string): Promise<CategorySummary | null>;
    getEarnedTitlesForUser(user: Principal): Promise<Array<string>>;
    getEarnedTitlesForUsers(users: Array<Principal>): Promise<Array<[Principal, Array<string>]>>;
    getFriendList(): Promise<Array<Principal>>;
    getFriendPublicProfile(friend: Principal): Promise<FriendPublicProfile | null>;
    getIncomingRequests(): Promise<Array<Principal>>;
    getMyIdentityCode(): Promise<string>;
    getMyPremiumApplication(): Promise<PremiumStatus | null>;
    getMyWheelData(): Promise<WheelData>;
    getOutgoingRequests(): Promise<Array<Principal>>;
    getPremiumApplicationsSummary(): Promise<[bigint, Array<[Principal, PremiumStatus]>]>;
    getPremiumStatus(user: Principal): Promise<PremiumStatus | null>;
    getProfilePicture(user: Principal): Promise<string | null>;
    getPublicStatsForUsers(users: Array<Principal>): Promise<Array<[Principal, PublicUserStats]>>;
    getTaskSuggestions(): Promise<Array<TaskSuggestion>>;
    getTasksForDate(date: string): Promise<Array<Task>>;
    getTasksForDateRange(startDate: string, endDate: string): Promise<Array<Task>>;
    getUniversalMasterCode(): Promise<string>;
    getUserIdentityCode(user: Principal): Promise<string>;
    getUserMonthlyExpiry(user: Principal): Promise<bigint | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    grantMonthlyAccess(user: Principal, months: bigint): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isCallerMonthlyActive(): Promise<boolean>;
    isCallerPremium(): Promise<boolean>;
    isUserPremium(user: Principal): Promise<boolean>;
    redeemPremiumCode(code: string): Promise<boolean>;
    rejectPremium(applicant: Principal): Promise<void>;
    removeFriend(friendId: Principal): Promise<void>;
    requestPremiumStatus(): Promise<void>;
    revokeMonthlyAccess(user: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCategorySummary(summary: CategorySummary): Promise<void>;
    sendFriendRequest(userId: Principal): Promise<void>;
    setActiveTitle(title: string): Promise<void>;
    setProfilePicture(url: string): Promise<void>;
    spinWheel(wheelType: WheelType): Promise<string>;
    toggleTaskCompletion(taskId: bigint): Promise<void>;
    updatePublicUserStats(stats: PublicUserStats): Promise<void>;
    updateTask(taskId: bigint, name: string, category: Category, priority: Priority, estimatedDuration: bigint, date: string): Promise<void>;
}
