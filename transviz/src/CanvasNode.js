import PropTypes from 'prop-types'
import { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import MainCard from "./MainCard"
import { flowContext } from './ReactFlowContext'

import { IconTrash, IconCopy, IconInfoCircle, IconAlertTriangle } from '@tabler/icons'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import { IconButton, Box, Typography, Divider, Button } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

const CardWrapper = styled(MainCard)(({ theme }) => ({
  background: theme.palette.card.main,
  color: theme.darkTextPrimary,
  border: "solid 1px",
  borderColor: theme.palette.primary[200] + 75,
  width: "300px",
  height: "auto",
  padding: "10px",
  boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.nodeToolTip.background,
    color: theme.palette.nodeToolTip.color,
    boxShadow: theme.shadows[1],
  },
}));

const CanvasNode = ({ data }) => {
  const theme = useTheme();
  const canvas = useSelector((state) => state.canvas);
  const { deleteNode, duplicateNode } = useContext(flowContext);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <CardWrapper
        content={false}
        sx={{
          padding: 0,
          borderColor: data.selected
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
        }}
        border={false}
      >
        <LightTooltip
          open={!canvas.canvasDialogShow && open}
          onClose={handleClose}
          onOpen={handleOpen}
          disableFocusListener={true}
          title={
            <div
              style={{
                background: "transparent",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton
                title="Duplicate"
                onClick={() => {
                  duplicateNode(data.id);
                }}
                sx={{
                  height: "35px",
                  width: "35px",
                  "&:hover": { color: theme?.palette.primary.main },
                }}
                color={
                  theme?.customization?.isDarkMode
                    ? theme.colors?.paper
                    : "inherit"
                }
              >
                <IconCopy />
              </IconButton>
              <IconButton
                title="Delete"
                onClick={() => {
                  deleteNode(data.id);
                }}
                sx={{
                  height: "35px",
                  width: "35px",
                  "&:hover": { color: "red" },
                }}
                color={
                  theme?.customization?.isDarkMode
                    ? theme.colors?.paper
                    : "inherit"
                }
              >
                <IconTrash />
              </IconButton>
              {/* <IconButton
                title="Info"
                onClick={() => {
                  setInfoDialogProps({ data });
                  setShowInfoDialog(true);
                }}
                sx={{
                  height: "35px",
                  width: "35px",
                  "&:hover": { color: theme?.palette.secondary.main },
                }}
                color={
                  theme?.customization?.isDarkMode
                    ? theme.colors?.paper
                    : "inherit"
                }
              >
                <IconInfoCircle />
              </IconButton> */}
            </div>
          }
          placement="right-start"
        >
          <Box>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <Box style={{ width: 50, marginRight: 10, padding: 5 }}>
                <div
                  style={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    cursor: "grab",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 5,
                      objectFit: "contain",
                    }}
                    src={`${baseURL}/api/v1/node-icon/${data.name}`}
                    alt="Notification"
                  />
                </div>
              </Box> */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    mr: 2,
                  }}
                >
                  {data.label}
                </Typography>
              </Box>
              {/* {warningMessage && (
                <>
                  <div style={{ flexGrow: 1 }}></div>
                  <Tooltip
                    title={
                      <span style={{ whiteSpace: "pre-line" }}>
                        {warningMessage}
                      </span>
                    }
                    placement="top"
                  >
                    <IconButton sx={{ height: 35, width: 35 }}>
                      <IconAlertTriangle size={35} color="orange" />
                    </IconButton>
                  </Tooltip>
                </>
              )} */}
            </div>
            {(data.inputAnchors.length > 0 || data.inputParams.length > 0) && (
              <>
                <Divider />
                <Box sx={{ background: theme.palette.asyncSelect.main, p: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    Inputs
                  </Typography>
                </Box>
                <Divider />
              </>
            )}
            {/* {data.inputAnchors.map((inputAnchor, index) => (
              <NodeInputHandler
                key={index}
                inputAnchor={inputAnchor}
                data={data}
              />
            ))}
            {data.inputParams
              .filter((inputParam) => !inputParam.hidden)
              .map((inputParam, index) => (
                <NodeInputHandler
                  key={index}
                  inputParam={inputParam}
                  data={data}
                />
              ))}
            {data.inputParams.find((param) => param.additionalParams) && (
              <div
                style={{
                  textAlign: "center",
                  marginTop:
                    data.inputParams.filter((param) => param.additionalParams)
                      .length ===
                    data.inputParams.length + data.inputAnchors.length
                      ? 20
                      : 0,
                }}
              >
                <Button
                  sx={{ borderRadius: 25, width: "90%", mb: 2 }}
                  variant="outlined"
                  onClick={onDialogClicked}
                >
                  Additional Parameters
                </Button>
              </div>
            )} */}
            <Divider />
            <Box sx={{ background: theme.palette.asyncSelect.main, p: 1 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Output
              </Typography>
            </Box>
            <Divider />

            {/* {data.outputAnchors.map((outputAnchor, index) => (
              <NodeOutputHandler
                key={index}
                outputAnchor={outputAnchor}
                data={data}
              />
            ))} */}
          </Box>
        </LightTooltip>
      </CardWrapper>
    </>
  );
};

CanvasNode.propTypes = {
  data: PropTypes.object
}

export default CanvasNode