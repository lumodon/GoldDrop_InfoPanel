import * as moment from 'moment'

window['moment'] = moment // For debugging

/*!
 * Merge two or more objects together.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object}            Merged values of defaults and options
 */
const extend = () => {
	// Variables
	var extended = {};
	var deep = false;
	var i = 0;

	// Check if a deep merge
	if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
	    deep = arguments[0];
	    i++;
	}

	// Merge the object into the extended object
	var merge = function (obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				// If property is an object, merge properties
				if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					extended[prop] = extend(extended[prop], obj[prop]);
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};

	// Loop through each object and conduct a merge
	for (; i < arguments.length; i++) {
		merge(arguments[i]);
	}

	return extended;

};

const createElement = (type, classList, parent, parentQuerySelector=document) => {
  const ele = document.createElement(type)
  ele.classList.add(...classList)
  if(parent) {
    if(parent instanceof HTMLElement) {
      parent.appendChild(ele)
    } else if(typeof parent === 'string') {
      parentQuerySelector.querySelector(parent).appendChild(ele)
    }
  }

  return ele
}

const convertToCurrency = (value) => {
  return Number(value).toLocaleString('en-US', {
    'style': 'currency', 'currency': 'USD'
  })
}

const calculateRealValue = (total, sample) => {
  const [ totalNum, sampleNum ] = ([total, sample]).map(it => Number(it.replace(/[$,]/g, '')))
  return convertToCurrency(totalNum - sampleNum)
}

const dateIsLastMonth = (inputDateEpoch) => {
  const dateAsEpoch = Number(inputDateEpoch) * 1000
  const beginningOfLastMonth = moment().startOf('month').subtract(1, 'month')
  const endOfLastMonth = moment(beginningOfLastMonth).add(1, 'month').subtract(1, 'second')
  const monthOfProvidedDate = moment(dateAsEpoch)
  return monthOfProvidedDate.isAfter(beginningOfLastMonth) && monthOfProvidedDate.isBefore(endOfLastMonth)
}

export {
  convertToCurrency,
  calculateRealValue,
  createElement,
  extend,
  dateIsLastMonth,
}
