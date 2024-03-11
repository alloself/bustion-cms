import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
    state: () => {
        return {
            notifications: [] as { color: string; content: string }[],
        };
    },
    actions: {
        pushNotification(
            notification: { color: string; content: string },
            delay = 7000
        ) {
            this.notifications.push(notification);
            setTimeout(() => {
                this.removeAlert();
            }, delay);
        },
        closeAlert(index: number) {
            this.notifications.splice(index, 1);
        },
        removeAlert() {
            this.notifications.shift();
        },
    },
});
