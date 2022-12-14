
import { AlertButton, AlertController, AlertInput, ToastController } from "@ionic/angular";

// Inserts element in a sorted array
export function sortedInsertion<T>(array: Array<T>, item: T, compare: Function) {

    if (array.length == 0 || compare(item, array[0])) {

        return 0;

    }
    if (compare(item, array[array.length - 1])) {

        return array.length;

    }

    let m = 0;
    let n = array.length - 1;
    while (m <= n) {

        let k = (n + m) >> 1;
        let cmp = compare(item, array[k]);

        if (cmp > 0) {

            m = k + 1;

        } else if (cmp < 0) {

            n = k - 1;

        } else {

            return k;

        }
    }
    return -m - 1;
}

// Displays an alert
export const presentAlert = async (alertController: AlertController, header: string, inputs: AlertInput[], buttons: AlertButton[]) => {

    const alert = await alertController.create({
        backdropDismiss: false,
        keyboardClose: false,
        header: header,
        buttons: buttons,
        inputs: inputs,
        mode: "md"
    });

    await alert.present();
}

// Formats the date into a remainder
export function formatRemainingDate(date: Date): string {

    // Turns a date into a remaining amount
    let seconds: number = (new Date().getTime() / 1000) - (date.getTime() / 1000);

    let number_of_days: number;
    let number_of_hours: number;
    let number_of_minutes: number;

    number_of_days = Math.floor(seconds / 86400);
    number_of_hours = Math.floor((seconds % 86400) / 3600);
    number_of_minutes = Math.floor(((seconds % 86400) % 3600) / 60);

    if (number_of_days == 0 && number_of_hours == 0 && number_of_minutes == 0) {
        return "Now";
    } else if (number_of_days == 0 && number_of_hours == 0) {
        return `${number_of_minutes}m`;
    } else if (number_of_days == 0) {
        return `${number_of_hours}h`;
    } else if (number_of_days <= 30) {
        return `${number_of_days}d`;
    } else {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

}

// Formats the date in a visible format
export function formatDate(date: Date): string {

    let minutes: string = String(date.getMinutes());
    let hours: number = date.getHours() % 12;
    if(hours == 0) hours = 12;

    if (minutes.length == 1) {
        minutes = 0 + minutes;
    }

    return hours + ":" + minutes + (date.getHours() > 11 ? " PM" : " AM");

}

// Displays a toast
export const displayWarning = async (msg: string, toastController: ToastController) => {

    const toast = await toastController.create({
        message: msg,
        duration: 1500,
        icon: 'globe'
    });

    await toast.present();

}