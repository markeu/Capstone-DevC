import pool from '../index';
import { createItem } from '../../database/query/helper';
import { hashPassword } from '../../utiities'

/**
 * Insert super admin after tables are created
 * @name insertSeed
 * @returns {String} details of insert
 */
// const adminSeed = async () => {
//   const seed = `INSERT INTO users
//   (id, firstName, lastName, password, email, gender, jobRole,
//     department, address, userRole)
//   VALUES ('001', 'uche', 'uzochukwu', 'mickey', 'adminTW@gmail.com'
//             'male', 'tech', 'developer', 'ph city', 'admin');
// `;

const users = [
	{
		id: '11111',
		firstName: 'kelvin',
		lastName: 'heart',
		email: 'chiamaka@gmail.com',
		gender: 'male',
		jobRole: 'techonologist',
		department: 'tech',
		address: 'oshodi , lagos',
        userRole: 'employee',
		password: hashPassword('password')
	},
	{
		id: '11112',
		firstName: 'uche',
		lastName: 'mark',
		email: 'admin@gmail.com',
		gender: 'male',
		jobRole: 'support assist',
        department: 'support',
		address: 'abuja',
		userRole: 'admin',
		password: hashPassword('mickey'),
	}
];

const userSeed = async () => {
	users.forEach(async (user) => {
		const { error } = await createItem('users', user);
        if (error) throw new Error(error);
	});
};

userSeed();
