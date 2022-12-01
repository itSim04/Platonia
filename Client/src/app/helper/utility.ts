import { AlertButton, AlertController, AlertInput } from "@ionic/angular";

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

export const presentAlert = async (alertController: AlertController, header: string, inputs: AlertInput[], buttons: AlertButton[]) => {

    const alert = await alertController.create({
        backdropDismiss: false,
        keyboardClose: false,
        header: header,
        buttons: buttons,
        inputs: inputs
    });

    await alert.present();
}

