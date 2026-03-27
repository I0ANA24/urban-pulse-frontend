"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

// ── Types ──
type TabType = "Users" | "Posts";

interface DuplicateUser {
  id: string;
  name: string;
  avatar: string;
  matchesCount: number;
}

interface DuplicatePost {
  id: string;
  preview: string;
  matchesCount: number;
}

const mockDuplicateUsers: DuplicateUser[] = [
  {
    id: "1",
    name: "Johnny Depp",
    avatar: "/profile.png",
    matchesCount: 2,
  },
  {
    id: "2",
    name: "Charles Leclerc",
    avatar: "/profile.png",
    matchesCount: 3,
  },
];

const mockDuplicatePosts: DuplicatePost[] = [
  {
    id: "1",
    preview:
      "Hellooo! My TV is suddenly not working anymore and I really...",
    matchesCount: 2,
  },
  {
    id: "2",
    preview:
      "What do you guys think about this pink colour for my door...",
    matchesCount: 2,
  },
];

export default function MergeDuplicatesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("Users");

  const handleReviewUser = (userId: string) => {
    router.push(`/admin/tasks/merge-duplicates/users/${userId}`);
  };

  const handleReviewPost = (postId: string) => {
    router.push(`/admin/tasks/merge-duplicates/posts/${postId}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-up pb-20">
      {/* Header */}
      <div className="flex items-center relative">
        <button
          onClick={() => router.back()}
          className="cursor-pointer hover:scale-105 active:scale-95 z-10"
        >
          <Image
            src="/undo.svg"
            alt="go_back"
            width={69}
            height={49}
            className="-ml-2"
          />
        </button>

        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <h1 className="text-white font-bold text-xl">Merge duplicates</h1>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-primary" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("Users")}
          className={`flex-1 py-3 rounded-xl font-bold text-base transition-all cursor-pointer ${
            activeTab === "Users"
              ? "bg-yellow-primary text-[#1a1a1a]"
              : "bg-[#6b6b3a] text-[#1a1a1a]/70"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("Posts")}
          className={`flex-1 py-3 rounded-xl font-bold text-base transition-all cursor-pointer ${
            activeTab === "Posts"
              ? "bg-yellow-primary text-[#1a1a1a]"
              : "bg-[#6b6b3a] text-[#1a1a1a]/70"
          }`}
        >
          Posts
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 mt-1">
        {activeTab === "Users" && (
          <>
            {mockDuplicateUsers.length === 0 && (
              <p className="text-white/40 text-sm text-center mt-10">
                No duplicate users found.
              </p>
            )}

            {mockDuplicateUsers.map((user) => (
              <div
                key={user.id}
                className="bg-[#1e1e1e] border-2 border-yellow-primary rounded-2xl p-5 flex flex-col gap-3"
              >
                {/* Top row: avatar + name + duplicate icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-white overflow-hidden flex-shrink-0">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name */}
                    <span className="text-white font-semibold text-lg">
                      {user.name}
                    </span>
                  </div>

                  {/* Duplicate users icon */}
                  <Users size={28} className="text-yellow-primary" />
                </div>

                {/* Matches count */}
                <p className="text-green-light font-semibold text-base">
                  {user.matchesCount} matches
                </p>

                {/* Review button */}
                <button
                  onClick={() => handleReviewUser(user.id)}
                  className="self-start bg-green-light hover:bg-green-light/80 active:scale-95 transition-all text-white font-bold text-sm px-8 py-2.5 rounded-full cursor-pointer"
                >
                  Review
                </button>
              </div>
            ))}
          </>
        )}

        {activeTab === "Posts" && (
          <>
            {mockDuplicatePosts.length === 0 && (
              <p className="text-white/40 text-sm text-center mt-10">
                No duplicate posts found.
              </p>
            )}

            {mockDuplicatePosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#1e1e1e] border-2 border-yellow-primary rounded-2xl p-5 flex flex-col gap-3"
              >
                {/* Post preview text */}
                <p className="text-white font-medium text-base leading-relaxed pr-16">
                  {post.preview}
                </p>

                {/* Matches count + duplicate posts icon */}
                <div className="flex items-center justify-between">
                  <p className="text-green-light font-semibold text-base">
                    {post.matchesCount} matches
                  </p>

                  {/* Overlapping squares icon */}
                  <div className="relative w-10 h-10">
                    <div className="absolute top-0 left-0 w-7 h-7 border-2 border-yellow-primary rounded-md bg-transparent" />
                    <div className="absolute bottom-0 right-0 w-7 h-7 border-2 border-yellow-primary rounded-md bg-yellow-primary/20" />
                  </div>
                </div>

                {/* Review button */}
                <button
                  onClick={() => handleReviewPost(post.id)}
                  className="self-start bg-green-light hover:bg-green-light/80 active:scale-95 transition-all text-white font-bold text-sm px-8 py-2.5 rounded-full cursor-pointer"
                >
                  Review
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}