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
        background: theme.palette.background.paper,
      }}
      variant="elevation"
      square={false}
    >
      <CardHeader
        sx={{ padding: "12px" }}
        title={<Skeleton variant="rounded" width="100%" height={40} />}
      ></CardHeader>
      <CardContent
        sx={{
          padding: "12px",
          height: "calc(100% - 52px)",
        }}
      >
        <Skeleton variant="rounded" width="100%" height="100%" />
      </CardContent>
    </Card>
  );
};

export default SkeletonTaskTicket;
