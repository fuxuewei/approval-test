import Image from "next/image"
import { cn } from "@/lib/utils";
import { Icon } from "./icons";

export const UserAvatar = ({ userInfo, size = 20, fontSize = 14 }: { userInfo?: { orgRealName?: string, orgNickName?: string, realName?: string, nickName?: string, avatarUrl?: string, phone?: string }, size?: number, fontSize?: number }) => {
    // 头像小于30px,不显示带字母的
    const nameInAvatar = size <= 30 ? undefined : (userInfo?.orgRealName || userInfo?.realName || userInfo?.nickName)?.slice(0, 1)
    return (!userInfo?.avatarUrl?.length && nameInAvatar?.length) ?
        <div
            className={cn('flex justify-center items-center rounded-full shrink-0',
                'bg-[#C5CEE0] border border-black/10 border-solid text-white'
            )}
            style={{
                fontSize: fontSize + 'px',
                width: size + 'px',
                height: size + 'px',
            }}
        >
            {nameInAvatar}
        </div> :
        !!userInfo?.avatarUrl?.length ? <Image
            src={userInfo.avatarUrl}
            className="shrink-0 rounded-full"
            width={size}
            height={size}
            style={{
                width: size + 'px',
                height: size + 'px',
            }}
            alt={nameInAvatar || ''}
        /> : <Icon
            name="DefaultAvatar"
            className='shrink-0'
            style={{
                width: size + 'px',
                height: size + 'px',
            }} />

}