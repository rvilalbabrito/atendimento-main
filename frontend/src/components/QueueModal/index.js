import React, { useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { Formik, FieldArray, Form, Field } from "formik";
import { toast } from "react-toastify";

import {
  FormControlLabel,
  Grid,
  FormControl,
  FormGroup,
  Tooltip,
  Checkbox,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { i18n } from "../../translate/i18n";
import Switch from "@material-ui/core/Switch";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import ColorPicker from "../ColorPicker";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Colorize } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import ConfirmationModal from "../ConfirmationModal";

import OptionsChatBot from "../ChatBots/options";
import CustomToolTip from "../ToolTips";

const longText = `
Desmarque esta opção para definir um horário de expediente para os atendimentos.
Quando um usuário escolher ser direcionado a um atendente, o sistema irá
verificar o horário e o dia, se estiver fora do expediente, envia um aviso
ao usuário e não direciona ao atendente escolhido.
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(1),
    flex: 1,
  },

  btnWrapper: {
    position: "relative",
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  colorAdorment: {
    width: 20,
    height: 20,
  },
  greetingMessage: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  custom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  expediente: {
    display: "flex",
    flexWrap: "wrap",
  },
  textSize: {
    fontSize: 12,
  },
  diasSemana: {
    marginLeft: theme.spacing(1),
  },
  hora: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 250,
  },
  textoExpediente: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: "100%",
  },
}));

const QueueSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  color: Yup.string().min(3, "Too Short!").max(9, "Too Long!").required(),
  greetingMessage: Yup.string(),
  chatbots: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(4, "too short").required("Required"),
      })
    )
    .required("Must have friends"),
});

const QueueModal = ({ open, onClose, queueId, onEdit }) => {
  const classes = useStyles();

  const initialState = {
    name: "",
    color: "",
    greetingMessage: "",
    chatbots: [],
  };

  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);
  const [queue, setQueue] = useState(initialState);
  const greetingRef = useRef();
  const [activeStep, setActiveStep] = React.useState(null);
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isStepContent, setIsStepContent] = React.useState(true);
  const [isNameEdit, setIsNamedEdit] = React.useState(null);
  const [isGreetingMessageEdit, setGreetingMessageEdit] = React.useState(null);

  const [defineWorkHours, SetDefineWorkHours] = useState(false);
  const [outOfWorkMessage, setOutOfWorkMessage] = useState("");
  const [startWorkHour, setStartWorkHour] = useState("08:00");
  const [endWorkHour, setEndWorkHour] = useState("17:30");
  const [startWorkHourWeekend, setStartWorkHourWeekend] = useState("08:00");
  const [endWorkHourWeekend, setEndWorkHourWeekend] = useState("17:30");

  const [startWorkHourWeekendD, setStartWorkHourWeekendD] = useState("08:00");
  const [endWorkHourWeekendD, setEndWorkHourWeekendD] = useState("17:30");
  
  const [seg, setSeg] = useState(true);
  const [ter, setTer] = useState(true);
  const [quar, setQuar] = useState(true);
  const [quin, setQuin] = useState(true);
  const [sex, setSex] = useState(true);
  const [sab, setSab] = useState(false);
  const [dom, setDom] = useState(false);

  useEffect(() => {
    (async () => {
      if (!queueId) return;
      try {
        const { data } = await api.get(`/queue/${queueId}`);
        setSeg(data.monday);
        setTer(data.tuesday);
        setQuar(data.wednesday);
        setQuin(data.thursday);
        setSex(data.friday);
        setSab(data.saturday);
        setDom(data.sunday);
        SetDefineWorkHours(data.defineWorkHours);
        setOutOfWorkMessage(data.outOfWorkMessage);
        setStartWorkHour(data.startWorkHour);
        setEndWorkHour(data.endWorkHour);
        setStartWorkHourWeekend(data.startWorkHourWeekend);
        setEndWorkHourWeekend(data.endWorkHourWeekend);

        setStartWorkHourWeekendD(data.startWorkHourWeekendD);
        setEndWorkHourWeekendD(data.endWorkHourWeekendD);

        setQueue((prevState) => {
          return { ...prevState, ...data };
        });
      } catch (err) {
        toastError(err);
      }
    })();

    return () => {
      setQueue({
        name: "",
        color: "",
        greetingMessage: "",
        chatbots: [],
      });

      setSeg(false);
      setTer(false);
      setQuar(false);
      setQuin(false);
      setSex(false);
      setSab(false);
      setDom(false);
      SetDefineWorkHours(false);
      setOutOfWorkMessage("");
      setStartWorkHour(false);
      setEndWorkHour(false);
      setStartWorkHourWeekend(false);
      setEndWorkHourWeekend(false);

      
    setStartWorkHourWeekendD(false);
    setEndWorkHourWeekendD(false);
    };
  }, [queueId, open]);

  useEffect(() => {
    console.log(activeStep);
    console.log(isNameEdit);

    if (activeStep === isNameEdit) {
      setIsStepContent(false);
    } else {
      setIsStepContent(true);
    }
  }, [isNameEdit, activeStep]);

  const handleClose = () => {
    onClose();
    setIsNamedEdit(null);
    setActiveStep(null);
    setGreetingMessageEdit(null);
    setSeg(false);
    setTer(false);
    setQuar(false);
    setQuin(false);
    setSex(false);
    setSab(false);
    setDom(false);
    SetDefineWorkHours(false);
    setOutOfWorkMessage("");
    setStartWorkHour(false);
    setEndWorkHour(false);
    setStartWorkHourWeekend(false);
    setEndWorkHourWeekend(false);

    
    setStartWorkHourWeekendD(false);
    setEndWorkHourWeekendD(false);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmModalOpen(false);
    setSelectedQueue(null);
    setSeg(false);
    setTer(false);
    setQuar(false);
    setQuin(false);
    setSex(false);
    setSab(false);
    setDom(false);
    SetDefineWorkHours(false);
    setOutOfWorkMessage("");
    setStartWorkHour(false);
    setEndWorkHour(false);
    setStartWorkHourWeekend(false);
    setEndWorkHourWeekend(false);

    setStartWorkHourWeekendD(false);
    setEndWorkHourWeekendD(false);
  };

  const handleDeleteQueue = async (optionsId) => {
    try {
      await api.delete(`/chatbot/${optionsId}`);
      const { data } = await api.get(`/queue/${queueId}`);
      setQueue(initialState);
      setQueue(data);
      setIsNamedEdit(null);
      setGreetingMessageEdit(null);
      toast.success(i18n.t("Queue deleted successfully!"));
    } catch (err) {
      toastError(err);
    }
  };

  const handleSaveQueue = async (values) => {
    try {
      const dataValues = {
        ...values,
        startWorkHour: startWorkHour,
        endWorkHour: endWorkHour,
        defineWorkHours: defineWorkHours,
        outOfWorkMessage: outOfWorkMessage,
        startWorkHourWeekend: startWorkHourWeekend,
        endWorkHourWeekend: endWorkHourWeekend,
        startWorkHourWeekendD: startWorkHourWeekendD,
        endWorkHourWeekendD: endWorkHourWeekendD,
        monday: seg,
        tuesday: ter,
        wednesday: quar,
        thursday: quin,
        friday: sex,
        saturday: sab,
        sunday: dom,
      };

      if (queueId) {
        await api.put(`/queue/${queueId}`, dataValues);
      } else {
        await api.post("/queue", dataValues);
      }

      toast.success("Queue saved successfully");
      handleClose();
    } catch (err) {
      toastError(err);
    }
  };

  const handleChangeHours = (e) => {
    if (e.target.value === "MON") {
      setSeg(e.target.checked);
    }
    if (e.target.value === "TUE") {
      setTer(e.target.checked);
    }
    if (e.target.value === "WED") {
      setQuar(e.target.checked);
    }
    if (e.target.value === "THU") {
      setQuin(e.target.checked);
    }
    if (e.target.value === "FRI") {
      setSex(e.target.checked);
    }
    if (e.target.value === "SAT") {
      setSab(e.target.checked);
    }
    if (e.target.value === "SUN") {
      setDom(e.target.checked);
    }

    if (e.target.value === "defineWorkHours") {
      SetDefineWorkHours(e.target.checked);
    }
  };

  const handleSaveBot = async (values) => {
    try {
      if (queueId) {
        const { data } = await api.put(`/queue/${queueId}`, values);
        if (data.chatbots && data.chatbots.length) {
          onEdit(data);
          setQueue(data);
        }
      } else {
        const { data } = await api.post("/queue", values);
        if (data.chatbots && data.chatbots.length) {
          setQueue(data);
          onEdit(data);
          handleClose();
        }
      }

      setIsNamedEdit(null);
      setGreetingMessageEdit(null);
      toast.success("Queue saved successfully");
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className={classes.root}>
      <ConfirmationModal
        title={
          selectedQueue &&
          `${i18n.t("queues.confirmationModal.deleteTitle")} ${
            selectedQueue.name
          }?`
        }
        open={confirmModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={() => handleDeleteQueue(selectedQueue.id)}
      >
        {i18n.t("Tem certeza? Todas as opções internas também serão excluídas")}
      </ConfirmationModal>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>
          {queueId
            ? `${i18n.t("queueModal.title.edit")}`
            : `${i18n.t("queueModal.title.add")}`}
        </DialogTitle>
        <Formik
          initialValues={queue}
          validateOnChange={false}
          enableReinitialize={true}
          validationSchema={QueueSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveQueue(values);
              actions.setSubmitting(false);
            }, 400);
          }}
        >
          {({ handleChange, touched, errors, isSubmitting, values }) => (
            <Form>
              <DialogContent dividers>
                <Field
                  as={TextField}
                  label={i18n.t("queueModal.form.name")}
                  autoFocus
                  name="name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                  margin="dense"
                  className={classes.textField}
                />
                <Field
                  as={TextField}
                  label={i18n.t("queueModal.form.color")}
                  name="color"
                  id="color"
                  onFocus={() => {
                    setColorPickerModalOpen(true);
                    greetingRef.current.focus();
                  }}
                  error={touched.color && Boolean(errors.color)}
                  helperText={touched.color && errors.color}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <div
                          style={{ backgroundColor: values.color }}
                          className={classes.colorAdorment}
                        ></div>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        size="small"
                        color="default"
                        onClick={() => setColorPickerModalOpen(true)}
                      >
                        <Colorize />
                      </IconButton>
                    ),
                  }}
                  variant="outlined"
                  margin="dense"
                />
                <ColorPicker
                  open={colorPickerModalOpen}
                  handleClose={() => setColorPickerModalOpen(false)}
                  onChange={(color) => {
                    values.color = color;
                    setQueue(() => {
                      return { ...values, color };
                    });
                  }}
                />
                <div>
                  <Field
                    as={TextField}
                    label={i18n.t("queueModal.form.greetingMessage")}
                    type="greetingMessage"
                    multiline
                    inputRef={greetingRef}
                    minRows={5}
                    fullWidth
                    name="greetingMessage"
                    error={
                      touched.greetingMessage && Boolean(errors.greetingMessage)
                    }
                    helperText={
                      touched.greetingMessage && errors.greetingMessage
                    }
                    variant="outlined"
                    margin="dense"
                  />
                </div>

                <div>
                  {/* Expediente */}

                  {defineWorkHours === true ? (
                    <div
                    // className={classes.textoExpediente}
                    >
                      <TextField
                        label={i18n.t("queueModal.form.outOfWorkMessage")}
                        rows={4}
                        multiline
                        fullWidth
                        name="outOfWorkMessage"
                        value={outOfWorkMessage}
                        error={
                          touched.outOfWorkMessage &&
                          Boolean(errors.outOfWorkMessage)
                        }
                        helperText={
                          touched.outOfWorkMessage && errors.outOfWorkMessage
                        }
                        variant="outlined"
                        margin="dense"
                        onChange={(e) => setOutOfWorkMessage(e.target.value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.diasSemana}>
                      <FormControl component="fieldset">
                        <FormGroup
                          aria-label="position"
                          row
                          sx={{
                            width: {
                              xs: 100,
                              sm: 200,
                              md: 300,
                              lg: 600,
                              xl: 700,
                            },
                          }}
                        >
                          <Tooltip title={longText} placement="top">
                            <FormControlLabel
                              value="defineWorkHours"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={defineWorkHours}
                                  onChange={handleChangeHours}
                                />
                              }
                              label="Definir horário de expediente"
                              labelPlacement="end"
                            />
                          </Tooltip>
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    {defineWorkHours === true ? (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.hora}
                            type="time"
                            label={i18n.t("queueModal.form.startWorkHour")}
                            name="startWorkHour"
                            value={startWorkHour}
                            onChange={(e) => setStartWorkHour(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.hora}
                            type="time"
                            label={i18n.t("queueModal.form.endWorkHour")}
                            name="endWorkHour"
                            value={endWorkHour}
                            onChange={(e) => setEndWorkHour(e.target.value)}
                          />
                        </Grid>
                      </>
                    ) : (
                      ""
                    )}
                  </Grid>
                  {defineWorkHours === true ? (
                    <>
                      <Grid item xs={12} sm={12} className={classes.diasSemana}>
                        <FormControl component="fieldset">
                          <FormGroup
                            aria-label="position"
                            row
                            sx={{
                              width: {
                                xs: 100,
                                sm: 200,
                                md: 300,
                                lg: 600,
                                xl: 700,
                              },
                            }}
                          >
                            <FormControlLabel
                              value="MON"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={seg}
                                  onChange={handleChangeHours}
                                />
                              }
                              label={i18n.t("queueModal.form.monday")}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="TUE"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={ter}
                                  onChange={handleChangeHours}
                                />
                              }
                              label={i18n.t("queueModal.form.tuesday")}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="WED"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={quar}
                                  onChange={handleChangeHours}
                                />
                              }
                              label={i18n.t("queueModal.form.wednesday")}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="THU"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={quin}
                                  onChange={handleChangeHours}
                                />
                              }
                              label={i18n.t("queueModal.form.thursday")}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="FRI"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={sex}
                                  onChange={handleChangeHours}
                                />
                              }
                              label={i18n.t("queueModal.form.friday")}
                              labelPlacement="end"
                            />
                          </FormGroup>
                        </FormControl>
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                  {defineWorkHours === true ? (
                    <>
                      <Grid container spacing={2} style={{ marginTop: 10 }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.hora}
                            type="time"
                            label={i18n.t("queueModal.form.startWorkHour")}
                            name="StartWorkHourWeekend"
                            value={startWorkHourWeekend}
                            onChange={(e) =>
                              setStartWorkHourWeekend(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.hora}
                            type="time"
                            label={i18n.t("queueModal.form.endWorkHour")}
                            name="EndWorkHourWeekend"
                            value={endWorkHourWeekend}
                            onChange={(e) =>
                              setEndWorkHourWeekend(e.target.value)
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} className={classes.diasSemana}>
                        <FormControl component="fieldset">
                          <FormGroup
                            aria-label="position"
                            row
                            sx={{
                              width: {
                                xs: 100,
                                sm: 200,
                                md: 300,
                                lg: 600,
                                xl: 700,
                              },
                            }}
                          >
                            <FormControlLabel
                              value="SAT"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={sab}
                                  onChange={handleChangeHours}
                                />
                              }
                              label={i18n.t("queueModal.form.saturday")}
                              labelPlacement="end"
                            />
                            {/* <FormControlLabel
                                value="SUN"
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={dom}
                                    onChange={handleChangeHours}
                                  />
                                }
                                label={i18n.t("queueModal.form.sunday")}
                                labelPlacement="end"
                              /> */}
                          </FormGroup>
                        </FormControl>
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}

                  {defineWorkHours === true ? (
                    <>
                      <Grid container spacing={2} style={{ marginTop: 10 }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.hora}
                            type="time"
                            label={i18n.t("queueModal.form.startWorkHour")}
                            name="StartWorkHourWeekendD"
                            value={startWorkHourWeekendD}
                            onChange={(e) =>
                              setStartWorkHourWeekendD(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.hora}
                            type="time"
                            label={i18n.t("queueModal.form.endWorkHour")}
                            name="EndWorkHourWeekendD"
                            value={endWorkHourWeekendD}
                            onChange={(e) =>
                              setEndWorkHourWeekendD(e.target.value)
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} className={classes.diasSemana}>
                        <FormControl component="fieldset">
                          <FormGroup
                            aria-label="position"
                            row
                            sx={{
                              width: {
                                xs: 100,
                                sm: 200,
                                md: 300,
                                lg: 600,
                                xl: 700,
                              },
                            }}
                          >
                            {/* <FormControlLabel
                                value="SAT"
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={sab}
                                    onChange={handleChangeHours}
                                  />
                                }
                                label={i18n.t("queueModal.form.saturday")}
                                labelPlacement="end"
                              /> */}
                            <FormControlLabel
                              value="SUN"
                              control={
                                <Checkbox
                                  size="small"
                                  checked={dom}
                                  onChange={handleChangeHours}
                                />
                              }
                              label={i18n.t("queueModal.form.sunday")}
                              labelPlacement="end"
                            />
                          </FormGroup>
                        </FormControl>
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <Typography variant="subtitle1">
                  Opções
                  <CustomToolTip
                    title="Adicione opções para construir um chatbot"
                    content="Se houver apenas uma opção, ela será escolhida automaticamente, fazendo com que o bot responda com a mensagem da opção e siga adiante"
                  >
                    <HelpOutlineOutlinedIcon
                      style={{ marginLeft: "14px" }}
                      fontSize="small"
                    />
                  </CustomToolTip>
                </Typography>

                <div>
                  <FieldArray name="chatbots">
                    {({ push, remove }) => (
                      <>
                        <Stepper
                          nonLinear
                          activeStep={activeStep}
                          orientation="vertical"
                        >
                          {values.chatbots &&
                            values.chatbots.length > 0 &&
                            values.chatbots.map((info, index) => (
                              <Step
                                key={`${info.id ? info.id : index}-chatbots`}
                                onClick={() => setActiveStep(index)}
                              >
                                <StepLabel key={`${info.id}-chatbots`}>
                                  {isNameEdit !== index &&
                                  queue.chatbots[index]?.name ? (
                                    <div
                                      className={classes.greetingMessage}
                                      variant="body1"
                                    >
                                      {values.chatbots[index].name}

                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          setIsNamedEdit(index);
                                          setIsStepContent(false);
                                        }}
                                      >
                                        <EditIcon />
                                      </IconButton>

                                      <IconButton
                                        onClick={() => {
                                          setSelectedQueue(info);
                                          setConfirmModalOpen(true);
                                        }}
                                        size="small"
                                      >
                                        <DeleteOutline />
                                      </IconButton>
                                    </div>
                                  ) : (
                                    <>
                                      <Field
                                        as={TextField}
                                        name={`chatbots[${index}].name`}
                                        variant="standard"
                                        color="primary"
                                        disabled={isSubmitting}
                                        autoFocus
                                        error={
                                          touched?.chatbots?.[index]?.name &&
                                          Boolean(
                                            errors.chatbots?.[index]?.name
                                          )
                                        }
                                        className={classes.textField}
                                      />

                                      <FormControlLabel
                                        control={
                                          <Field
                                            as={Switch}
                                            color="primary"
                                            name={`chatbots[${index}].isAgent`}
                                            checked={
                                              values.chatbots[index].isAgent ||
                                              false
                                            }
                                          />
                                        }
                                        label="Atendente"
                                      />

                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          values.chatbots[index].name
                                            ? handleSaveBot(values)
                                            : null
                                        }
                                        disabled={isSubmitting}
                                      >
                                        <SaveIcon />
                                      </IconButton>

                                      <IconButton
                                        size="small"
                                        onClick={() => remove(index)}
                                        disabled={isSubmitting}
                                      >
                                        <DeleteOutline />
                                      </IconButton>
                                    </>
                                  )}
                                </StepLabel>

                                {isStepContent && queue.chatbots[index] && (
                                  <StepContent>
                                    <>
                                      {isGreetingMessageEdit !== index ? (
                                        <div
                                          className={classes.greetingMessage}
                                        >
                                          <Typography
                                            color="textSecondary"
                                            variant="body1"
                                          >
                                            Message:
                                          </Typography>

                                          {
                                            values.chatbots[index]
                                              .greetingMessage
                                          }

                                          {!queue.chatbots[index]
                                            ?.greetingMessage && (
                                            <CustomToolTip
                                              title="A mensagem é obrigatória para seguir ao próximo nível"
                                              content="Se a mensagem não estiver definida, o bot não seguirá adiante"
                                            >
                                              <HelpOutlineOutlinedIcon
                                                color="secondary"
                                                style={{ marginLeft: "4px" }}
                                                fontSize="small"
                                              />
                                            </CustomToolTip>
                                          )}

                                          <IconButton
                                            size="small"
                                            onClick={() =>
                                              setGreetingMessageEdit(index)
                                            }
                                          >
                                            <EditIcon />
                                          </IconButton>
                                        </div>
                                      ) : (
                                        <div
                                          className={classes.greetingMessage}
                                        >
                                          <Field
                                            as={TextField}
                                            name={`chatbots[${index}].greetingMessage`}
                                            variant="standard"
                                            margin="dense"
                                            fullWidth
                                            multiline
                                            error={
                                              touched.greetingMessage &&
                                              Boolean(errors.greetingMessage)
                                            }
                                            helperText={
                                              touched.greetingMessage &&
                                              errors.greetingMessage
                                            }
                                            className={classes.textField}
                                          />

                                          <IconButton
                                            size="small"
                                            onClick={() =>
                                              handleSaveBot(values)
                                            }
                                            disabled={isSubmitting}
                                          >
                                            {" "}
                                            <SaveIcon />
                                          </IconButton>
                                        </div>
                                      )}

                                      <OptionsChatBot chatBotId={info.id} />
                                    </>
                                  </StepContent>
                                )}
                              </Step>
                            ))}

                          <Step>
                            <StepLabel
                              onClick={() => push({ name: "", value: "" })}
                            >
                              Adiconar opções
                            </StepLabel>
                          </Step>
                        </Stepper>
                      </>
                    )}
                  </FieldArray>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  // color="secondary"
                  disabled={isSubmitting}
                  // variant="outlined"
                >
                  {i18n.t("queueModal.buttons.cancel")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {queueId
                    ? `${i18n.t("queueModal.buttons.okEdit")}`
                    : `${i18n.t("queueModal.buttons.okAdd")}`}
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default QueueModal;