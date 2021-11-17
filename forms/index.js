// import in caolan forms
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) {
        object.widget.classes = [];
    }
    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }
    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }
    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' :
        '';
    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

//create keyboard case form function
const createkeyboardCaseForm = () => {
        return forms.create({
        'name': fields.string({required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'brand': fields.string({required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'material': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'size': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators':[validators.integer()]
        }),
        'keyboardKit': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'quantity': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators':[validators.integer()]
            
        }),
        'cost': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            // 'validators':[validators.integer()]
        }),
        'description': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
    })
};

//create keyboard pcb form function
const createkeyboardPcbForm = () => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'switchConnectionType': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'size': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
    }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
        
    }),
    'keyboardKit': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};
//create keyboard plate form function
const createkeyboardPlateForm = () => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'plateMaterial': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'size': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
    }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
        
    }),
    'keyboardKit': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};

//create keyboard switch form function
const createkeyboardSwitchForm = () => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'switchType': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'switchConnectionType': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]   
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};
module.exports = { 
    createkeyboardCaseForm, 
    createkeyboardPcbForm, 
    createkeyboardPlateForm, 
    createkeyboardSwitchForm, 
    bootstrapField };
        