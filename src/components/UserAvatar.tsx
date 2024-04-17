import React, { forwardRef } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { SxProps } from '@mui/system';

interface UserAvatarProps extends AvatarProps {
  sx?: SxProps;
  width?: number | string;  // Width can be a number (like 50) or a string (like '50px')
  height?: number | string; // Same for height
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ sx, width = 50, height = 50, ...props }, ref) => {
    return (
      <Avatar
        ref={ref}
        alt="user avatar"
        // src=""
        sx={{
          width: width, 
          height: height,
          ...sx,
        }}
        {...props}
      />
    );
  }
);

export default UserAvatar;
