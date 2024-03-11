import theme from "@/theme/theme";
import { checkAuthInputValidity } from "@/utils/authCheck";
import { Grid, OutlinedInput, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchIdDupicate } from "@/apis/auth";
import { useQuery } from "react-query";

type IdInputProps = {
  id: string;
  setId(id: string): void;
  idValidityFlag: boolean;
  setIdValidityFlag(value: boolean): void;
  idDuplicateFlag: boolean;
  setIdDuplicateFlag(value: boolean): void;
};

const IdInput = ({
  id,
  setId,
  idValidityFlag,
  setIdValidityFlag,
  idDuplicateFlag,
  setIdDuplicateFlag,
}: IdInputProps) => {
  const [isClickIdButton, setIsClickIdButton] = useState(false);
  const [idErrorState, setIdErrorState] = useState(false);
  const [idErrorMessage, setIdErrorMessage] = useState("");

  const idValidityState = !!(id && !idValidityFlag);
  const idIsDisabled = !!(!idValidityFlag || idDuplicateFlag);

  const { data, refetch } = useQuery(
    "checkId",
    () => fetchIdDupicate({ id, setIdErrorMessage, setIdErrorState }),
    { enabled: false, cacheTime: 0 }
  );

  useEffect(() => {
    setIsClickIdButton(false);
    if (idValidityState) {
      setIdErrorMessage("아이디는 5 ~ 20자만 사용 가능합니다.");
      setIdErrorState(true);
    } else {
      setIdErrorMessage("");
      setIdErrorState(false);
    }
  }, [id]);

  useEffect(() => {
    if (data !== undefined) {
      setIdDuplicateFlag(data)
    }
  }, [data])

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={9}>
          <OutlinedInput
            type="text"
            fullWidth
            size="small"
            placeholder={"아이디"}
            value={id}
            error={idErrorState}
            onChange={(e) => {
              setId(e.target.value);
              setIdValidityFlag(
                checkAuthInputValidity({
                  type: "id",
                  authValue: e.target.value,
                })
              );
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              mt: 0.1,
              ml: 1,
              fontWeight: "bold",
              fontSize: "11px",
              color: theme.palette.error.main,
            }}
          >
            {idErrorMessage}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: `${theme.palette.secondary.main}`,
              height: "41px",
              borderRadius: "7px",
            }}
            disabled={idIsDisabled}
            onClick={() => {
              refetch();
              setIsClickIdButton(true);
            }}
          >
            {idDuplicateFlag ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default IdInput;
