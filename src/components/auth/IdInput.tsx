import theme from "@/theme/theme";
import { checkAuthInputValidity, fetchDupicate } from "@/utils/authCheck";
import { Grid, OutlinedInput, Typography, Button } from "@mui/material";
import { useState } from "react";
import AuthResultModal from "./AuthResultModal";

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
  const [showModal, setShowModal] = useState(false);
  const idValidityState = !!(id && !idValidityFlag);
  const idIsDisabled = !!(!idValidityFlag || idDuplicateFlag);

  const changeIdDuplicateButton = (id: string) => {
    setShowModal(true);
    const idDuplication = fetchDupicate({ type: "id", authValue: id });
    idDuplication ? setIdDuplicateFlag(true) : setIdDuplicateFlag(false);
  };

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
            error={idValidityState}
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
          {idValidityState && (
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
              아이디는 5글자 이상 20글자 이하여야 합니다.
            </Typography>
          )}
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
              changeIdDuplicateButton(id);
            }}
          >
            {idDuplicateFlag ? "확인 완료" : "중복 확인"}
          </Button>
        </Grid>
      </Grid>
      <AuthResultModal 
      type="id"
      showModal={showModal}
      isSuccess={idDuplicateFlag}
      handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default IdInput;
