import { Modal, Grid, Box, Typography, TextField, Autocomplete } from '@mui/material';

type ModalProps={
    isOpen: boolean,
    onCloseModal: () => void;
}

type User={
    id: string,
    label: string,
    name: string
}

const users:User[] = [
    {id:"AD", label:"Andorra", name:"마효리"},
    {id:"AF", label:"Afghanistan", name:"정석호"},
    {id:"AI", label:"Anguilla", name:"박수빈"}
];

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const TaskModal = ({isOpen, onCloseModal}:ModalProps) =>{
    return <div>
        <Modal open={isOpen} onClose={onCloseModal}>
            <Box sx={style}>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <Box sx={{display: 'grid',
                            gap: 1,}}>
                            <Typography>Task명</Typography>
                            <TextField fullWidth sx={{"& .MuiInputBase-root": {
                                height: 40
                            }}} color="secondary" focused />
                            <Typography>내용</Typography>
                            <TextField fullWidth sx={{
                                "& .MuiInputBase-root": {height: 120}, 
                                gridColumn: '1', 
                                gridRow: 'span 4'}} color="secondary" focused />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{display: 'grid',
                            gap: 1,}}>
                            <Typography>담당자</Typography>
                            <Autocomplete
                                id="country-select-demo"
                                sx={{ width: 300 }}
                                options={users}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.id.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.id.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {option.name}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                    />
                                )}
                            />
                            <Typography>기간</Typography>
                            <TextField color="secondary" focused />
                            <Typography>하위 이슈</Typography>
                            <TextField color="secondary" focused />
                            <Typography>수정/삭제 권한</Typography>
                            <TextField color="secondary" focused />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    </div>
}

export default TaskModal;