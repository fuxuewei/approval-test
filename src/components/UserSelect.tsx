import { FC, useState } from "react";
import { MusedamUser } from "@/types/musedam";
import { dispatchMuseDAMClientAction, logToParentConsole } from "@/embed/message";
import { Combobox } from "@/app/project/spaces/(list)/_components/combobox";
import { useDebounceEffect } from "ahooks";
import { cn } from "@/lib/utils";
import { formatMemberName } from "@/utils/formatMemberName";
import { UserAvatar } from "./UserAvatar";
import { CheckIcon } from "lucide-react";
import { Spin } from "./ui/spin";

export const UserList: FC<{
    checkedItems?: MusedamUser[],
    onSelect: (user: MusedamUser) => void,
    keyword?: string
}>
    = ({ checkedItems, onSelect, keyword }) => {
        const [users, setUsers] = useState<MusedamUser[]>([]);
        const [loading, setLoading] = useState(true)

        const getUsers = async () => {
            const action = "getOrgUsers";
            const res: { members?: MusedamUser[] } | undefined = await dispatchMuseDAMClientAction(action, {
                page: 1,
                pageSize: 10,
                keyword: keyword || undefined,
            });
            setLoading(false)
            if (res) {
                const { members } = res;
                const uniqueUsers = members?.filter(
                    (user, index, self) => index === self.findIndex((u) => u.userId === user.userId),
                );
                setUsers(uniqueUsers || []);
                logToParentConsole({
                    getOrgUsers: uniqueUsers
                });
            }
        };


        useDebounceEffect(
            () => {
                getUsers();
            },
            [keyword],
            {
                wait: 500,
            },
        );


        return <div className="w-full">
            {users?.map((user) => (
                <div
                    key={user.userId}
                    className={cn(
                        "h-[54px] flex items-center justify-between space-x-2.5 p-2 hover:bg-[var(--ant-basic-1)] rounded-[6px] cursor-pointer",
                    )}
                    onClick={() => {
                        onSelect?.(user);
                    }}
                >
                    <UserAvatar userInfo={user} size={36} />
                    <div className="flex flex-col gap-0.5 flex-1 overflow-hidden ">
                        <div className="text-[14px] leading-[22px] font-medium text-[var(--ant-basic-8)] overflow-hidden text-ellipsis whitespace-nowrap">
                            {formatMemberName(user)}
                        </div>
                        <div className="text-xs text-[var(--ant-basic--5)] overflow-hidden text-ellipsis whitespace-nowrap">
                            {((user?.departmentList || [])?.length > 0 || user?.jobTitle) && (
                                <div className="mt-0.5 text-[var(--ant-basic-5)] text-xs leading-4 text-ellipsis overflow-hidden whitespace-nowrap">
                                    {user?.departmentList?.[0].name || ""}
                                    {!!user?.departmentList?.[0].name && !!user.jobTitle ? "-" : ""}
                                    {user.jobTitle || ""}
                                </div>
                            )}
                        </div>
                    </div>
                    {checkedItems?.some(item => item.userId === user.userId) ?
                        <CheckIcon className="size-[14px] text-primary-6" /> :
                        <div className="size-[14px]" />}
                </div>
            ))}

            {loading && <div className="flex items-center justify-center p-2">
                <Spin variant="dots" />
            </div>}
        </div>
    }