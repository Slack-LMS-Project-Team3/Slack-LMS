"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { SquarePen } from "lucide-react";
import { CardModal } from "@/components/modal/CardModal";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/store/profileStore";
import { getProfile, patchProfile, Profile } from "@/apis/profileApi";
import { CardFooter } from "@/components/ui/card";
import { convertFileToBase64 } from "@/utils/fileUtils";
import { useMyUserStore } from "@/store/myUserStore";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import { useMessageStore } from "@/store/messageStore";

type ProfileProps = { targetId?: string };
import { useCreateDM } from "@/hooks/createDM";

export default function ProfilePage() {
  // DM방 생성
  const createDM = useCreateDM();

  // URL에서 workspaceId 추출
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const myUserId = useMyUserStore((s) => s.userId);

  // store에서 targetId 가져오기
  const { isOpen, userId: bufferTargetId } = useProfileStore();
  const { uploadToS3 } = useProfileImageUpload();
  const updateUserProfile = useMessageStore((s) => s.updateUserProfile);

  // 프로필 닫기 시 실행할 함수형 변수 선언
  const close = useProfileStore((s) => s.setClose);

  // 프로필 편집 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 프로필 데이터 상태 관리
  const [profile, setProfile] = useState<Profile | null>(null);

  // 프로필 편집 폼 데이터 상태 관리
  const [form, setForm] = useState<{
    nickname: string;
    // phone?: string;
    github?: string;
    blog?: string;
  }>({ nickname: "" });

  // 프로필 저장 중 상태 관리
  const [saving, setSaving] = useState(false);

  // 프로필 이미지 상태 관리
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모달이 닫힐 때 편집 내용 초기화
  useEffect(() => {
    if (!isModalOpen && profile) {
      setForm({
        nickname: profile.nickname,
        github: profile.github ?? "",
        blog: profile.blog ?? "",
      });
      setSelectedFile(null);
      setPreview("");
    }
  }, [isModalOpen, profile]);

  // 프로필 조회 (페이지 렌더 후 바로 실행 (userId 변경 시 재 실행))
  useEffect(() => {
    (async () => {
      if (bufferTargetId === null) {
        return;
      }
      try {
        const profile = await getProfile(workspaceId, bufferTargetId);
        setProfile(profile);
        setForm({
          nickname: profile.nickname,
          // phone: profile.phone ?? "",
          github: profile.github ?? "",
          blog: profile.blog ?? "",
        });
      } catch (error) {
        console.error("프로필 조회 실패:", error);
      }
    })();
  }, [bufferTargetId, isModalOpen]);

  // 프로필 수정
  const saveChange = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const currentImageSrc = profile.image;
      const payload: Partial<
        Omit<Profile, "user_id" | "email" | "workspace_id" | "role_name" | "role_id" | "group_name" | "group_id">
      > = {
        nickname: form.nickname,
        // phone: form.phone ?? null,
        github: form.github ?? null,
        blog: form.blog ?? null,
        image: preview || currentImageSrc,
      };

      const updatedProfile = await patchProfile(
        workspaceId,
        myUserId!,
        payload,
      );

      setProfile(updatedProfile);
      setIsModalOpen(false);

      const profileUpdates: { nickname: string; image?: string } = {
        nickname: form.nickname,
      };

      if (preview) {
        profileUpdates.image = preview;
      }

      updateUserProfile(myUserId!, profileUpdates); // myUserId가 없으면 error 날 거임. refactoring 필요함
    } catch (error) {
      console.error(error);
      alert("프로필 수정에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // 프로필 이미지 변경
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // S3에 업로드하고 URL 받아서 미리보기 업데이트
    const imageUrl = await uploadToS3(file);
    if (!imageUrl) {
      alert("이미지 업로드에 실패했습니다.");
      return;
    }
    setPreview(imageUrl);
  };

  return (
    <div
      className="flex flex-col h-full w-full gap-4 overflow-auto p-4 bg-background text-foreground scrollbar-thin"
      style={{ flexBasis: "100%" }} // 패널 내부이므로 100%
    >
      {/* 헤더 (프로필과 닫기 버튼) */}
      <div className="flex flex-row w-full">
        <h1 className="flex flex-1 items-center justify-start text-xl font-bold">
          Profile
        </h1>
        <button
          className="flex flex-1 items-center justify-end text-sm"
          onClick={close}
        >
          <X size={20} />
        </button>
      </div>
      {/* 프로필 이미지 */}
      <div className="flex w-full min-w-0 items-center justify-center">
        <img
          src={profile?.image || "/user_default.png"}
          alt="profile_image"
          className="w-1/2 aspect-square bg-gray-400 rounded-2xl overflow-hidden object-cover"
        />
      </div>
      {/* 사용자 이름과 역할 */}
      <div className="flex w-full items-end justify-between gap-2">
        <h1 className="flex-1 min-w-0 justify-start text-xl font-bold truncate">
          {profile?.nickname}
        </h1>
        <h1 className="flex-shrink-0 justify-end text-md font-bold text-gray-500">
          {profile?.role_name}
        </h1>
      </div>
      {/* 버튼 (메시지, 편집) */}
      <div className="flex w-full min-w-0 items-center justify-center">
        {/* 타인 프로필: DM 버튼 / 본인 프로필: 편집 버튼 / */}
        {myUserId !== bufferTargetId ? (
          <Button
            onClick={() => {
              if (bufferTargetId) createDM(bufferTargetId);
            }}
            variant="outline"
            size="sm"
            className="flex flex-1 min-w-0 items-center justify-start text-md font-bold cursor-pointer"
          >
            <Mail size={24} />
            <span className="truncate">Direct Message</span>
          </Button>
        ) : (
          <div className="flex flex-1 flex-row gap-2">
            <Button
              onClick={() => {
                if (bufferTargetId) createDM(bufferTargetId);
              }}
              variant="outline"
              size="sm"
              className="flex flex-1 min-w-0 items-center justify-start text-md font-bold cursor-pointer"
            >
              <Mail size={24} />
              <span className="truncate">Direct Message</span>
            </Button>
            <CardModal
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-1 min-w-0 items-center justify-start text-md font-bold cursor-pointer"
                >
                  <SquarePen size={24} />
                  <span className="truncate">Edit Profile</span>
                </Button>
              }
              title="Edit your profile"
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
            >
              {/* CardModal 내용: 프로필 편집 폼 */}
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  saveChange();
                }}
              >
                <div className="flex flex-row gap-5">
                  {/* 프로필 이미지 */}
                  <div className="flex flex-col justify-between h-full w-[185px] gap-2">
                    <img
                      src={preview || profile?.image || "/user_default.png"}
                      alt="profile_image"
                      className="h-full aspect-square bg-gray-200 rounded-2xl overflow-hidden object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Change
                    </Button>
                  </div>
                  {/* 프로필 정보 */}
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-col gap-4">
                      {/* 필수 필드1: 역할 */}
                      <div className="flex flex-col">
                        <label className="font-semibold">Role*</label>
                        <span className="w-full font-normal">
                          {profile?.role_name}
                        </span>
                      </div>
                      {/* 필수 필드2: 이메일 */}
                      <div className="flex flex-col">
                        <label className="font-semibold">Email*</label>
                        <span className="w-full font-normal">
                          {profile?.email}
                        </span>
                      </div>
                      {/* 필수 필드3: 닉네임 */}
                      <div>
                        <label className="font-semibold">Nickname*</label>
                        <Input
                          type="text"
                          value={form.nickname}
                          onChange={(e) =>
                            setForm({ ...form, nickname: e.target.value })
                          }
                          className="w-full border rounded px-2 py-1 font-normal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 max-h-80 overflow-y-auto scrollbar-thin">
                  {/* 추가 필드2: github */}
                  <label className="font-semibold">
                    Github
                    <Input
                      type="text"
                      value={form.github}
                      onChange={(e) =>
                        setForm({ ...form, github: e.target.value })
                      }
                      className="w-full border rounded px-2 py-1 font-normal"
                    />
                  </label>
                  {/* 추가 필드3: blog */}
                  <label className="font-semibold">
                    Blog
                    <Input
                      type="text"
                      value={form.blog}
                      onChange={(e) =>
                        setForm({ ...form, blog: e.target.value })
                      }
                      className="w-full border rounded px-2 py-1 font-normal"
                    />
                  </label>
                </div>
                <CardFooter className="flex sticky bottom-0 justify-end p-0">
                  <Button
                    type="submit"
                    variant="default"
                    disabled={saving || !form.nickname}
                    className="w-full"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </CardModal>
          </div>
        )}
      </div>
      {/* 구분선 */}
      <Separator />
      {/* 이메일 */}
      <div className="flex flex-col min-h-[48px] w-full min-w-0 justify-start gap-1">
        <span className="flex-1 min-w-0 text-md font-bold text-gray-500 truncate">
          Email address*
        </span>
        <span className="flex-1 min-w-0 text-md truncate">
          {profile?.email}
        </span>
      </div>
      {/* 전화번호 */}
      {/* <div className="flex flex-col min-h-[48px] w-full min-w-0 justify-start gap-1">
        <span className="flex-1 min-w-0 text-md font-bold text-gray-500 truncate">Phone</span>
        <span className="flex-1 min-w-0 text-md truncate">{profile?.phone ?? ""}</span>
      </div> */}
      {/* github */}
      <div className="flex flex-col min-h-[48px] w-full min-w-0 justify-start gap-1">
        <span className="flex-1 min-w-0 text-md font-bold text-gray-500 truncate">
          Github
        </span>
        <span className="flex-1 min-w-0 text-md truncate">
          {profile?.github ?? ""}
        </span>
      </div>
      {/* blog */}
      <div className="flex flex-col min-h-[48px] w-full min-w-0 justify-start gap-1">
        <span className="flex-1 min-w-0 text-md font-bold text-gray-500 truncate">
          Blog
        </span>
        <span className="flex-1 min-w-0 text-md truncate">
          {profile?.blog ?? ""}
        </span>
      </div>
      {/* 소속 그룹 */}
      <div className="flex flex-col min-h-[48px] w-full min-w-0 justify-start gap-1">
        <span className="flex-1 min-w-0 text-md font-bold text-gray-500 truncate">
          Groups
        </span>
        <div className="flex-1 min-w-0 text-md">
          <ul className="list-disc list-inside pl-1">
            {profile?.group_name?.map((group) => (
              <li key={group} className="truncate">
                {group}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
