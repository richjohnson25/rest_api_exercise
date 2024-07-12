"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMovies = void 0;
const fileSystem_1 = require("../utils/fileSystem");
const GetMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, time, date } = req.query;
        const { movies } = (0, fileSystem_1.readMovieFileSync)();
        const { transactions } = (0, fileSystem_1.readTransactionFileSync)();
        if (!status && !date && !time) {
            res.status(200).send({
                error: false,
                message: 'Successfully Get All Movies!',
                data: movies
            });
        }
        if (status) {
            const moviesByStatus = movies.filter((item) => {
                return item.status === status.split('%').join(' ').toUpperCase();
            });
            res.status(200).send({
                error: false,
                message: 'Successfully Get All Movies!',
                data: moviesByStatus
            });
        }
        if (date && time) {
            const moviesOnShowing = movies.filter((item) => {
                return item.status === "ON SHOWING";
            });
            moviesOnShowing.forEach((item) => {
                let totalBookSeat = 0;
                transactions.forEach((trans) => {
                    if (item.id === trans.movies_id) {
                        if (date === trans.date && time === trans.time) {
                            totalBookSeat += trans.total_seat;
                        }
                    }
                });
                item.seat_available = item.total_seat - totalBookSeat;
            });
            res.status(200).send({
                error: false,
                message: 'Successfully Get All Movies!',
                data: moviesOnShowing
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.GetMovies = GetMovies;
