const bookingRepository = require("../repositories/bookingRepository")

module.exports={
    CreateBooking(reqArgs){
        return bookingRepository.createBooking(reqArgs)
    },
    async showBooking(){
        try{
            const Booking = await bookingRepository.findBooking();
            return {
                Booking : Booking
            }
        }catch(err){
            throw err;
        }
    }
}