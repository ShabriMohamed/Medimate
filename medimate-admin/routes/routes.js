const express = require("express");
const router = express.Router();
const Medicine = require('../models/medicine');
const DiabetesAwarenessData = require('../models/DiabetesAwarenessData');
const CholesterolAwarenessData = require('../models/CholesterolAwarenessData');
const HypertensionAwarenessData = require('../models/HypertensionAwarenessData');
const Feedback = require('../models/Feedback');

const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const User = require('../models/User');


router.get("/", (req, res) => {
    res.redirect('/login'); 
});

router.get("/add", (req, res) => {
    res.render('add_medicines', { title: "Add Medicine" });
});

router.get("/manage_content", (req, res) => {
    res.render('manage_content', { title: "Manage Content" });
});

router.get("/index", (req, res) => {
    res.render('index', { title: "Admin Dashboard" });
});


router.get("/manage_medicines", async (req, res) => {
    try {
        const medicines = await Medicine.find(); 
        res.render('manage_medicines', { title: "Manage Medicine", medicines: medicines });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching medicines");
    }
});

router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const medicine = await Medicine.findById(id);
        res.render('edit_medicine', { title: "Edit Medicine", medicine: medicine });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching medicine");
    }
});


router.post("/add-medicine", async (req, res) => {
    try {
        const alternative_brands = [];
        if (req.body.alternative_brands_name && req.body.alternative_brands_link) {
            
            const names = Array.isArray(req.body.alternative_brands_name) ? req.body.alternative_brands_name : [req.body.alternative_brands_name];
            const links = Array.isArray(req.body.alternative_brands_link) ? req.body.alternative_brands_link : [req.body.alternative_brands_link];
            
            for (let i = 0; i < names.length; i++) {
                
                if (names[i] && links[i]) {
                    alternative_brands.push({ name: names[i], link: links[i] });
                }
            }
        }

        const newMedicine = new Medicine({
            medical_name: req.body.medical_name,
            description: req.body.description,
            usage: req.body.usage,
            dosage: req.body.dosage,
            side_effects: req.body.side_effects ? req.body.side_effects.split(',') : [],
            alternative_brands: alternative_brands
        });

        await newMedicine.save();
        req.session.message = "Medicine added successfully!";
        res.redirect('/add');
    } catch (error) {
        console.error("Error adding medicine:", error);
        req.session.message = "Error adding medicine.";
        res.redirect('/add');
    }
});

router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        
        await Medicine.findByIdAndDelete(id);
        res.sendStatus(200); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        
        const medicine = await Medicine.findById(id);

        
        medicine.medical_name = req.body.medical_name;
        medicine.description = req.body.description;
        medicine.usage = req.body.usage;
        medicine.dosage = req.body.dosage;
        medicine.side_effects = req.body.side_effects.split(',').map(effect => effect.trim());

        
        medicine.alternative_brands = [];

        
        let index = 0;
        while (req.body[`alternative_brands_name_${index}`] && req.body[`alternative_brands_link_${index}`]) {
            const brandName = req.body[`alternative_brands_name_${index}`];
            const brandLink = req.body[`alternative_brands_link_${index}`];
            if (brandName && brandLink) {
                medicine.alternative_brands.push({ name: brandName, link: brandLink });
            }
            index++;
        }

        
        await medicine.save();

        res.redirect('/manage_medicines');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating medicine");
    }
});



router.get("/manage_diabetes", async (req, res) => {
    try {
        const diabetesData = await DiabetesAwarenessData.find();
        res.render('manage_diabetes', { title: "Manage Diabetes Awareness Data", diabetesData: diabetesData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching diabetes awareness data");
    }
});


router.post("/manage_diabetes/add", async (req, res) => {
    try {
        const { title, content, sections, resources } = req.body;
        const newData = new DiabetesAwarenessData({
            title: title,
            content: content,
            sections: sections,
            resources: resources
        });
        await newData.save();
        req.session.message = "Data added successfully!";
        res.redirect('/manage_diabetes');
    } catch (error) {
        console.error("Error adding data:", error);
        req.session.message = "Error adding data.";
        res.redirect('/manage_diabetes');
    }
});


router.get("/manage_diabetes/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await DiabetesAwarenessData.findById(id);
        res.render('edit_diabetes_data', { title: "Edit Diabetes Awareness Data", data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data for editing");
    }
});

router.post("/manage_diabetes/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { title, content } = req.body;
        await DiabetesAwarenessData.findByIdAndUpdate(id, {
            title: title,
            content: content
        });
        res.redirect('/manage_diabetes');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating data");
    }
});


router.post("/manage_diabetes/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        
        await DiabetesAwarenessData.findByIdAndDelete(id);
        req.session.message = "Data deleted successfully!";
        res.redirect('/manage_diabetes');
    } catch (error) {
        console.error(error);
        req.session.message = "Error deleting data.";
        res.redirect('/manage_diabetes');
    }
});





router.get("/manage_cholesterol", async (req, res) => {
    try {
        const cholesterolData = await CholesterolAwarenessData.find();
        res.render('manage_cholesterol', { title: "Manage Cholesterol Awareness Data", cholesterolData: cholesterolData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching cholesterol awareness data");
    }
});


router.post("/manage_cholesterol/add", async (req, res) => {
    try {
        const { title, content, sections, resources } = req.body;
        const newData = new CholesterolAwarenessData({
            title: title,
            content: content,
            sections: sections,
            resources: resources
        });
        await newData.save();
        req.session.message = "Data added successfully!";
        res.redirect('/manage_cholesterol');
    } catch (error) {
        console.error("Error adding data:", error);
        req.session.message = "Error adding data.";
        res.redirect('/manage_cholesterol');
    }
});


router.get("/manage_cholesterol/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await CholesterolAwarenessData.findById(id);
        res.render('edit_cholesterol_data', { title: "Edit Cholesterol Awareness Data", data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data for editing");
    }
});

router.post("/manage_cholesterol/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { title, content } = req.body;
        await CholesterolAwarenessData.findByIdAndUpdate(id, {
            title: title,
            content: content
        });
        res.redirect('/manage_cholesterol');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating data");
    }
});


router.post("/manage_cholesterol/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        
        await CholesterolAwarenessData.findByIdAndDelete(id);
        req.session.message = "Data deleted successfully!";
        res.redirect('/manage_cholesterol');
    } catch (error) {
        console.error(error);
        req.session.message = "Error deleting data.";
        res.redirect('/manage_cholesterol');
    }
});



router.get("/manage_hypertension", async (req, res) => {
    try {
        const hypertensionData = await HypertensionAwarenessData.find();
        res.render('manage_hypertension', { title: "Manage Hypertension Awareness Data", hypertensionData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching hypertension awareness data");
    }
});


router.post("/manage_hypertension/add", async (req, res) => {
    try {
        const { title, content, sections, resources } = req.body;
        const newData = new HypertensionAwarenessData({
            title,
            content,
            sections,
            resources
        });
        await newData.save();
        req.session.message = "Data added successfully!";
        res.redirect('/manage_hypertension');
    } catch (error) {
        console.error("Error adding data:", error);
        req.session.message = "Error adding data.";
        res.redirect('/manage_hypertension');
    }
});


router.get("/manage_hypertension/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await HypertensionAwarenessData.findById(id);
        res.render('edit_hypertension_data', { title: "Edit Hypertension Awareness Data", data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data for editing");
    }
});

router.post("/manage_hypertension/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { title, content } = req.body;
        await HypertensionAwarenessData.findByIdAndUpdate(id, {
            title,
            content
        });
        res.redirect('/manage_hypertension');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating data");
    }
});


router.post("/manage_hypertension/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        
        await HypertensionAwarenessData.findByIdAndDelete(id);
        req.session.message = "Data deleted successfully!";
        res.redirect('/manage_hypertension');
    } catch (error) {
        console.error(error);
        req.session.message = "Error deleting data.";
        res.redirect('/manage_hypertension');
    }
});




router.get("/login", (req, res) => {
    res.render('login', { title: "Admin Login" });
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            req.session.message = "Invalid email or password.";
            return res.redirect('/login');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            req.session.message = "Invalid email or password.";
            return res.redirect('/login');
        }

        req.session.isAdminLoggedIn = true;
        res.redirect('/index'); 
    } catch (error) {
        console.error(error);
        req.session.message = "Error logging in.";
        res.redirect('/login');
    }
});



router.get("/signup", (req, res) => {
    res.render('signup', { title: "Admin Signup" });
});


const validateSignup = [
    body('username').isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
    body('email').isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email is already registered');
            }
            return true;
        }),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
];


router.post("/signup", validateSignup, async (req, res) => {
    const { username, email, password } = req.body;

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.message = errors.array()[0].msg;
        return res.redirect('/signup');
    }

    try {
        
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            req.session.message = "Email is already registered.";
            return res.redirect('/signup');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        
        await newUser.save();
        req.session.message = "Admin account created successfully!";
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.session.message = "Error creating admin account.";
        res.redirect('/signup');
    }
});


router.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.render('feedbacks', { title: 'User Feedbacks', feedbacks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user feedbacks');
    }
});


router.post('/logout', (req, res) => {
    
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/login'); 
        }
    });
});

module.exports = router;
