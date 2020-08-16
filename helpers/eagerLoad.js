const Image = require("../models/Image");
const Op = require('sequelize').Op;

async function eagerLoadHospital(hospitals) {
    const ids = hospitals.map(x => x.id);
    const images = await Image.findAll({
        where: {
            table_name: 'hospitals',
            table_id: {
                [Op.in] : ids
            },
            main: true
        }
    });
    return hospitals.map(hospital => {
        const img = images.filter(img => img.table_id === hospital.id);
        hospital.image = img.length ? img[0] : null;
        return hospital;
    });
}

async function eagerLoadDoctor(doctors, mapped = false) {
    const ids = doctors.map(x => x.id);
    const images = await Image.findAll({
        where: {
            table_name: 'doctors',
            table_id: {
                [Op.in] : ids
            },
        },
        order: [
            ['main', 'desc']
        ]
    });
    return doctors.map(doctor => {
        const img = images.filter(img => img.table_id === doctor.id);
        doctor = mapped ? doctor.dataValues : doctor;
        doctor.image = img.length ? (mapped ? img[0].dataValues : img[0]) : null;
        return doctor;
    });
}

module.exports = {eagerLoadHospital, eagerLoadDoctor};