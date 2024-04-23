import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import theme from "@/theme/theme";

const SkeletonTaskTicket = () => {
  return (
    <Card
      sx={{
        height: "200px",
        borderRadius: 4,
        p: 1,
        boxShadow: 3,
        background: theme.palette.primary.light,
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
        },
      }}
      variant="elevation"
      square={false}
    >
      <CardHeader>
        <Skeleton variant="rounded" width={80} height={30} />
      </CardHeader>
      <CardContent>
        <Skeleton variant="rounded" height="calc(100% - 70px)" />
      </CardContent>
    </Card>
  );
};

export default SkeletonTaskTicket;
