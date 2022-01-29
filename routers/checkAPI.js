const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({status : 'Pass', data : 'Api Works' });
})

module.exports = router;