import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import Jimp from 'jimp'
import { throwError } from './respond'

const inputPath = path.join(__dirname, '..', 'static')
const outputPath = path.join(app.getPath('userData'), 'ports')

const digit = bit => path.join(inputPath, `port_${bit}@2x.png`)

const getDigitImage = (digits, callback) => {
    const images = new Array(digits.length).fill(null)
    let read = 0

    digits.forEach((number, i) => {
        Jimp.read(digit(number), (err, image) => {
            if (err) return throwError(...ERR.GENER(R.ERR_JIMP, err))

            images[i] = image
            if (++read === digits.length) callback(images)
        })
    })
}

const newPortImage = (port, portImagePath, callback) => {
    mkdirp.sync(outputPath)
    const portString = port.toString().split('')

    getDigitImage(portString, digitImages => {

        Jimp.read(digit('base'), (err, image) => {
            if (err) return throwError(...ERR.GENER(R.ERR_JIMP, err))

            digitImages.forEach((digitImage, i) => {
                image.composite( digitImage, (i*7+4)*2, 6 )
            })

            image.write(portImagePath)
            setTimeout(() => {
                callback(portImagePath)
            }, 100)
            return
        })

    })
}

const portImage = (port, callback) => {
    const portImageName = `${port}_portTemplate@2x.png`
    const portImagePath = path.join(outputPath, portImageName)

    fs.access(portImagePath, fs.constants.R_OK, err => {
        if (err) return newPortImage(port, portImagePath, callback)

        callback(portImagePath)
        return
    })
}

export default portImage
