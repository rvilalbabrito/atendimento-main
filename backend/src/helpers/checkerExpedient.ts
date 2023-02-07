import Queue from "../models/Queue";

const weekDay = async (queue: Queue): Promise<boolean> => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long"
  });

  switch (today) {
    case "Monday":
      return queue.monday;
    case "Tuesday":
      return queue.tuesday;
    case "Wednesday":
      return queue.wednesday;
    case "Thursday":
      return queue.thursday;
    case "Friday":
      return queue.friday;
    case "Saturday":
      return queue.saturday;
    case "Sunday":
      return queue.sunday;
    default:
      return false;
  }
};

export const checkerExpedientQueue = async (
  queueId: string | number
): Promise<boolean> => {
  if (!queueId) return false;
  const queue = await Queue.findOne({
    where: {
      id: queueId
    }
  });

  const week = await weekDay(queue);
  if (week) {
    const data = new Date();
    const hora = data.getHours();
    const min = data.toLocaleString("en-US", { minute: "2-digit" });
    const horaAtual = `${(hora < 10 ? "0" : "") + hora}:${min}`;

    const {
      startWorkHour,
      endWorkHour,
      startWorkHourWeekend,
      endWorkHourWeekend,
      startWorkHourWeekendD,
      endWorkHourWeekendD,
      defineWorkHours
    } = queue;

    const verifyWorkHour =
      startWorkHour <= horaAtual && endWorkHour >= horaAtual;

    const verifyWeekendWorkHour =
      startWorkHourWeekend <= horaAtual && endWorkHourWeekend >= horaAtual;

    const verifyWeekendWorkHourD =
      startWorkHourWeekendD <= horaAtual && endWorkHourWeekendD >= horaAtual;
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long"
    });

    if (defineWorkHours) {
      if (week) {
        console.log(week);

        if (today === "Saturday" && verifyWeekendWorkHour) {
          return true;
        }

        if (today === "Sunday" && verifyWeekendWorkHourD) {
          return true;
        }

        if (today !== "Saturday" && today !== "Sunday" && verifyWorkHour) {
          return true;
        }
        return false;
      }
      return false;
    }
    return true;
  }

  return true;
};
