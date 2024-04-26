import { Skeleton} from "@mui/material";

const SkeletonTextField = () => {
  return (
    <Skeleton
      variant="rectangular"
      height={67}
      sx={{ borderRadius: "4px", flexBasis: "50%" }}
    />
  );
};

export default SkeletonTextField;
