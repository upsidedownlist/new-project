import {body, CustomValidator, matchedData, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {ServiceType} from "../models/counselling-type.enum";
import {UrgencyLevel} from "../models/urgency-level.enum";
import {DeliveryMethod} from "../models/delivery-method.enum";
import {InvalidRequestError} from "./invalid-request-error";

/*
    This file contains the logic for validating requests to
    the Counselling Service API
 */

const isValidServiceType: CustomValidator = type => {
    if (Object.values(ServiceType).includes(type as ServiceType)) {
        return true;
    } else {
        throw new InvalidRequestError("invalid value");
    }
}

const isValidUrgency: CustomValidator = urgency => {
    if (Object.values(UrgencyLevel).includes(urgency as UrgencyLevel)) {
        return true;
    } else {
        throw new InvalidRequestError("invalid value");
    }
};

const isValidDelivery: CustomValidator = delivery => {
    if (Object.values(DeliveryMethod).includes(delivery as DeliveryMethod)) {
        return true;
    } else {
        throw new InvalidRequestError("invalid value");
    }
}

export const postRules = [
    body('serviceName')
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('location')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('school')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('organization')
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('serviceType')
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1})
        .withMessage("serviceType is not an array"),
    body('serviceType.*')
        .exists({checkNull: true, checkFalsy:true})
        .custom(isValidServiceType),
    body('urgency')
        .exists({checkNull: true, checkFalsy:true})
        .custom(isValidUrgency),
    body('targetClients')
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1}),
    body('targetClients.*')
        .exists({checkNull: true, checkFalsy:true})
        .isString()
        .withMessage("targetClients is not an array"),
    body('isAllDay')
        .exists({checkNull: true})
        .isBoolean(),
    body('website')
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('specialty')
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1})
        .withMessage("specialty is not an array"),
    body('specialty.*')
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('delivery')
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1})
        .withMessage("delivery is not an array"),
    body('delivery.*')
        .exists({checkNull: true, checkFalsy:true})
        .custom(isValidDelivery),
    body('description')
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('logo')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
]

export const patchRules = [
    body('serviceName')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('location')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('school')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('organization')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('serviceType')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1})
        .withMessage("serviceType is not an array"),
    body('serviceType.*')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .custom(isValidServiceType),
    body('urgency')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .custom(isValidUrgency),
    body('targetClients')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1})
        .withMessage("targetClients is not an array"),
    body('targetClients.*')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('isAllDay')
        .optional()
        .exists({checkNull: true})
        .isBoolean(),
    body('website')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('specialty')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1})
        .withMessage("specialty is not an array"),
    body('specialty.*')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('delivery')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isArray({min: 1})
        .withMessage("delivery is not an array"),
    body('delivery.*')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .custom(isValidDelivery),
    body('description')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
    body('logo')
        .optional()
        .exists({checkNull: true, checkFalsy:true})
        .isString(),
]

export function validateRequest(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export function filterRequest(req: Request) {
    return matchedData(req, { locations: ['body'] });
}