import DocumentPicker from "react-native-document-picker";


export async function galleryforImageClick() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.images,            
                ],
                mode : 'import', copyTo: 'documentDirectory',
                presentationStyle: 'fullScreen'
            });
            resolve(res);
            //console.log("JSON.stringify(res) galleryforImageClick: ", JSON.stringify(res));

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                //console.log("user cancle document picker galleryforImageClick", err);
            } else {
                throw err;
            }
        }
    }
    );
}

export async function galleryforVideoClick() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.video,
                ],
                mode : 'import', copyTo: 'documentDirectory',
                presentationStyle: 'fullScreen'
            });
            //console.log("JSON.stringify(res): galleryforVideoClick", JSON.stringify(res));
            resolve(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                //console.log("user cancle document picker galleryforVideoClick", err);
            } else {
                throw err;
            }
        }
    }
    );
}

export async function audioClick() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.audio,
                ],
                mode : 'import', copyTo: 'documentDirectory',
            });
            //console.log("JSON.stringify(res): audioClick", JSON.stringify(res));
            resolve(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                //console.log("user cancle document picker audioClick", err);
            } else {
                throw err;
            }
        }
    }
    );
}