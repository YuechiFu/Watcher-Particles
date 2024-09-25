import i18n from "@/i18n"
/**
 * @desc: 通过手机加速度传感器捕获一组加速度值
 * @param {*} time ms 
 * @param {*} max 
 * @return {*} [[x, y, z]]
 */
export const capturePhoneMotions = (time = 1800, max = 100) => {
    const { t } = i18n.global
    return new Promise((resolve, reject) => {
        if (!(DeviceMotionEvent && DeviceMotionEvent.requestPermission)) {
            console.log(t("noDeviceMotionEvent"))
            alert(t("noDeviceMotionEvent"))
            return reject()
        }
        const values = []
        const acFn = (e) => {
            values.push([
                event.accelerationIncludingGravity.x,
                event.accelerationIncludingGravity.y,
                event.accelerationIncludingGravity.z
            ])
        }
        DeviceMotionEvent.requestPermission()
            .then((permisson) => {
                if (permisson !== "granted") {
                    return reject()
                }
                window.addEventListener("devicemotion", acFn, true)
                const completeFn = () => {
                    window.removeEventListener("devicemotion", acFn, true)
                    resolve(values)
                    clearTimeout(tt)
                }
                const tt = setTimeout(completeFn, time)
                if (values.length >= max) {
                    completeFn()
                }
            })
            .catch((err) => {
                return reject(err)
            })
    })




}

// 随机
function getRandomString(length, type = 'dw') {
    let w = 'abcdefghijklmnopqrstuvwxyz', d = '0123456789';
    const characters = type === 'number' ? d : type === 'alpha' ? w : w + d;
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}





// 导出json文件
export const exportJsonToFile = (jsonData, fileName = `g_${new Date().getTime()}.json`) => {
    const jsonDataStr = JSON.stringify(jsonData, null, 2)
    const blob = new Blob([jsonDataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}


export const downloadFile = (url, fileName) => {
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

// 导出json文件
export const exportDataFile = (dataString, fileName = `txt_${new Date().getTime()}`) => {
    if (!dataString) return
    let blob
    let suffix = fileName.match(/(\.(\S+))$/)
    if (suffix && suffix[0]) {
        switch (suffix[0]) {
            case '.json':
                try {
                    const jsonDataStr = JSON.stringify(dataString, null)
                    blob = new Blob([jsonDataStr], { type: "application/json" })
                } catch (err) {

                }
                break
            case '.txt':
                blob = new Blob([dataString], { type: "application/txt" })
                break
        }
    }
    if (!blob) { return }
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}




