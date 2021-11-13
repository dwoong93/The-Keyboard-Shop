const express = require("express");
const router = express.Router();
// import in  Forms
const { bootstrapField, createkeyboardCaseForm, createkeyboardPcbForm} = require('../forms');

// #1 import in the Product model
const {Keyboardcase, Keyboardpcb, Keyboardplate} = require('../models')

//Display keyboard Cases
router.get('/keyboardcases', async function(req,res){
    let keebCases = await Keyboardcase.collection().fetch();
    let keebPcb = await Keyboardpcb.collection().fetch();
    res.render('products/index',{
        'keyboardcases':keebCases.toJSON(),
        'keyboardpcb':keebPcb.toJSON()
    }) 
})

// Create keyboardCase
router.get('/keyboardcases/create', async (req, res) => {
    const productForm = createkeyboardCaseForm();
    res.render('products/createcase',{
    'form': productForm.toHTML(bootstrapField)
    })
})
// post created KeyboardCase
router.post('/keyboardcases/create', async(req,res)=>{
    const productForm = createkeyboardCaseForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardcase();
            product.set('name', form.data.name);
            product.set('material', form.data.material);
            product.set('size', form.data.size);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/keyboardcases');
        },
        'error': async (form) => {
            res.render('products/createpcb', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//create keyboard pcb
router.get('/keyboardpcb/create', async (req, res) => {
    const productForm = createkeyboardPcbForm();
    res.render('products/createpcb',{
    'form': productForm.toHTML(bootstrapField)
    })
})

// post created pcb
router.post('/keyboardpcb/create', async(req,res)=>{
    const productForm = createkeyboardPcbForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardpcb();
            product.set('name', form.data.name);
            product.set('switchConnectionType', form.data.switchConnectionType);
            product.set('size', form.data.size);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/keyboardcases');
        },
        'error': async (form) => {
            res.render('products/createpcb', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//update KeyboardCase by id
router.get('/keyboardcase/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebCases)


        const productForm = createkeyboardCaseForm();
        

        productForm.fields.name.value = keebCases.get('name');
        productForm.fields.material.value = keebCases.get('material');
        productForm.fields.size.value = keebCases.get('size');
        productForm.fields.keyboardKit.value = keebCases.get('keyboardKit');
        productForm.fields.quantity.value = keebCases.get('quantity');
        productForm.fields.cost.value = keebCases.get('cost');
        productForm.fields.description.value = keebCases.get('description');

        res.render('products/update', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardcases':keebCases.toJSON()
        })
        // res.render('products/update')
})
//process update of KeyboardCase
router.post('/keyboardcase/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardCaseForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebCases.set(form.data);
            keebCases.save();
            res.redirect('/products/keyboardcases');
        },
        'error':async (form) =>{
            res.render('products/update',{
                'form': form.toHTML(bootstrapField),
                'keyboardcases': keebCases.toJSON()
            })
        }
    })
    
})

//Delete keyboardCase
router.get('/keyboardcase/:product_id/delete', async (req, res) => {
    const productId = req.params.product_id;
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebCases)


        res.render('products/delete', {
            'keyboardcases':keebCases.toJSON()
        })
})
//process delete keyboard Case
router.post('/keyboardcase/:product_id/delete', async (req, res) => {
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebCases.destroy();
    res.redirect('/products/keyboardcases')
})









module.exports = router;