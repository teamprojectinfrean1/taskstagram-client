import React, { forwardRef } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { SxProps } from '@mui/system';

interface UserAvatarProps extends AvatarProps {
  sx?: SxProps;
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ sx, ...props }, ref) => {
    return (
      <Avatar
        ref={ref}
        alt="user avatar"
        // src=""
        sizes="140px"
        sx={{
          width: 50,
          height: 50,
          ...sx,
        }}
        {...props}
      />
    );
  }
);

export default UserAvatar;
