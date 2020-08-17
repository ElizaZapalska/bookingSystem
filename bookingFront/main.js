import {generateTable, takeSavedBookedRooms} from './table.js';
import {hours, classrooms } from "./constants.js";
import {urlRequest} from "./constants"; //doesn't work


takeSavedBookedRooms()
generateTable(hours, classrooms)



