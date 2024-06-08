import React, { forwardRef } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { SxProps } from '@mui/system';

interface UserAvatarProps extends AvatarProps {
  imageUrl?: string | null;
  sx?: SxProps;
  size?: number | string;  
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ imageUrl, sx, size = 50, ...props }, ref) => {
    return (
      <Avatar
        ref={ref}
        alt="user avatar"
        src={imageUrl ?? undefined}
        sx={{
          width: size, 
          height: size,
          ...sx,
        }}
        {...props}
      />
    );
  }
);

export default UserAvatar;
