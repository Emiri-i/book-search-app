import dayjs from "dayjs";

export default {
  formatDate(date: any, format?: string) {
    if (!format) {
      return dayjs(date).format("YYYY/MM/DD");
    } else {
      return dayjs(date).format(format);
    }
  },
};
