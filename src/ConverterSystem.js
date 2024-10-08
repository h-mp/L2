/**
 * Module for the converter system class.
 * 
 * @author Hilja-Maria Paananen <hp222qn@student.lnu.se>
 */

import { InputValidator } from './InputValidator.js'
import { LengthConverter } from './converters/LengthConverter.js'
import { TemperatureConverter } from './converters/TemperatureConverter.js'
import { SpeedConverter } from './converters/SpeedConverter.js'
import { WeightConverter } from './converters/WeightConverter.js'
import { VolumeConverter } from './converters/VolumeConverter.js'

export class ConverterSystem {
  #inputValidator

  #lengthConverter
  #temperatureConverter
  #speedConverter
  #weightConverter
  #volumeConverter

  #conversionMethods

  constructor() {
    this.#inputValidator = new InputValidator()
    this.#lengthConverter = new LengthConverter()
    this.#temperatureConverter = new TemperatureConverter()
    this.#speedConverter = new SpeedConverter()
    this.#weightConverter = new WeightConverter()
    this.#volumeConverter = new VolumeConverter()

    this.#conversionMethods = {
      temperature: this.convertTemperature.bind(this),
      length: this.convertLength.bind(this),
      speed: this.convertSpeed.bind(this),
      weight: this.convertWeight.bind(this),
      volume: this.convertVolume.bind(this)
    }
  }

  /**
   * Validates the inputs.
   * 
   * @param {*} convertFrom - The input for the unit to convert from
   * @param {*} convertTo - The input for the unit to convert to
   * @param {*} numberToConvert - The input for the number to convert, optional
   */
  #validateInputs(convertFrom, convertTo, numberToConvert) {
    this.#inputValidator.validateInputTypeString(convertFrom)
    this.#inputValidator.validateInputTypeString(convertTo)
    this.#inputValidator.validateInputTypeNumber(numberToConvert)
  }

  /**
   * Chooses the conversion method based on the sent conversion type.
   * 
   * @param {String} conversionType - The conversion type
   * @throws {Error} - If the conversion is not available
   * @returns {Function} - The conversion method
   */
  #chooseConversionMethod(conversionType) {
    const conversionMethod = this.#conversionMethods[conversionType.toLowerCase()]
    if (!conversionMethod) {
      throw new Error('Conversion not available')
    }
    return conversionMethod
  }

  /**
   * Handles temperature conversion selection and converts the number.
   *
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Number} numberToConvert - The number to convert
   * @throws {Error} - If the conversion is not available
   * @returns {Number} - The converted number
   */
  convertTemperature(convertFrom, convertTo, numberToConvert) {
    this.#validateInputs(convertFrom, convertTo, numberToConvert)

    return this.#temperatureConverter.convert(convertFrom, convertTo, numberToConvert)
  }

  /**
   * Handles length conversion selection and converts the number.
   *
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Number} numberToConvert - The number to convert
   * @throws {Error} - If the conversion is not available
   * @returns {Number} - The converted number
   */
  convertLength(convertFrom, convertTo, numberToConvert) {
    this.#validateInputs(convertFrom, convertTo, numberToConvert)
    this.#inputValidator.validatePositiveNumber(numberToConvert)

    return this.#lengthConverter.convert(convertFrom, convertTo, numberToConvert)
  }

  /**
   * Handles length conversion selection and converts the number.
   *
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Number} numberToConvert - The number to convert
   * @throws {Error} - If the conversion is not available
   * @returns {Number} - The converted number
   */
  convertSpeed(convertFrom, convertTo, numberToConvert) {
    this.#validateInputs(convertFrom, convertTo, numberToConvert)
    this.#inputValidator.validatePositiveNumber(numberToConvert)

    return this.#speedConverter.convert(convertFrom, convertTo, numberToConvert)
  }

  /**
   * Handles weight conversion selection and converts the number.
   *
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Number} numberToConvert - The number to convert
   * @throws {Error} - If the conversion is not available
   * @returns {Number} - The converted number
   */
  convertWeight(convertFrom, convertTo, numberToConvert) {
    this.#validateInputs(convertFrom, convertTo, numberToConvert)
    this.#inputValidator.validatePositiveNumber(numberToConvert)

    return this.#weightConverter.convert(convertFrom, convertTo, numberToConvert)
  }

  /**
   * Handles volume conversion selection and converts the number.
   *
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Number} numberToConvert - The number to convert
   * @throws {Error} - If the conversion is not available
   * @returns {Number} - The converted number
   */
  convertVolume(convertFrom, convertTo, numberToConvert) {
    this.#validateInputs(convertFrom, convertTo, numberToConvert)
    this.#inputValidator.validatePositiveNumber(numberToConvert)

    return this.#volumeConverter.convert(convertFrom, convertTo, numberToConvert)
  }

  /**
   * Handles multiple value conversion selection and converts the numbers.
   * 
   * @param {String} conversionType - The type of conversion i.e. temperature, length, weight, volume
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Array} numbersToConvert - The numbers to convert
   * @returns {Array} - The converted numbers
   */
  convertMultipleValues(conversionType, convertFrom, convertTo, numbersToConvert) {
    this.#inputValidator.validateInputTypeString(conversionType)
    this.#inputValidator.validateInputTypeArray(numbersToConvert)

    const conversionMethod = this.#chooseConversionMethod(conversionType)

    return numbersToConvert.map(number => conversionMethod(convertFrom, convertTo, number))
  }

  /**
   * Handles conversion selection, converts the number and returns a summary of the conversion.
   * 
   * @param {String} conversionType - The type of conversion i.e. temperature, length, weight, volume
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Number} numberToConvert - The number to convert
   * @returns {Object} - The converted number with a summary of the conversion
   */
  convertWithSummary(conversionType, convertFrom, convertTo, numberToConvert) {
    this.#inputValidator.validateInputTypeString(conversionType)

    const conversionMethod = this.#chooseConversionMethod(conversionType)

    const convertedNumber = conversionMethod(convertFrom, convertTo, numberToConvert)

    return {
      conversionType: conversionType,
      convertFrom: convertFrom,
      convertTo: convertTo,
      numberToConvert: numberToConvert,
      convertedNumber: convertedNumber
    }
  }

  /**
   * Handles conversion selection, converts the number and rounds it up to the chosen accuracy. 
   * 
   * @param {String} conversionType - The type of conversion i.e. temperature, length, weight, volume
   * @param {String} convertFrom - The unit to convert from
   * @param {String} convertTo - The unit to convert to
   * @param {Number} numberToConvert - The number to convert
   * @param {Number} decimalPlaces - The number of decimal places to round the converted number to
   * @returns {Number} - The converted number rounded up
   */
  convertAndRoundUp(conversionType, convertFrom, convertTo, numberToConvert, decimalPlaces) {
    this.#inputValidator.validateInputTypeString(conversionType)
    this.#inputValidator.validateInputTypeNumber(decimalPlaces)

    const conversionMethod = this.#chooseConversionMethod(conversionType)

    const convertedNumber = conversionMethod(convertFrom, convertTo, numberToConvert)

    return parseFloat(convertedNumber.toFixed(decimalPlaces))
  }
}
