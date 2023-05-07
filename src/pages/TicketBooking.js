import { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Header from "../components/layout/Header";

const Seat = ({ seat, onSeatSelect, selectedSeats, className }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if(token == null) {
            navigate("/login");
        }
    }, [])
    const config = {
        headers: {
            authorization: "Bearer " + localStorage.getItem("token")
        }
    };
    const handleClick = () => {
        if (seat.status) {
            onSeatSelect(seat);
        }
    };

    const isSeatSelected = selectedSeats.find(selectedSeat => selectedSeat.id === seat.id);

    let seatClass = 'bg-white';
    if (seat.status === 0) {
        seatClass = '!bg-gray-400 cursor-not-allowed';
    } else if (isSeatSelected) {
        seatClass = '!bg-green-500';
    }

    return (
        <button className={`w-10 h-10 rounded-full ${seatClass} ${className}`} onClick={handleClick}>
            {isSeatSelected ? `${seat.name}` : seat.name}
        </button>
    );
};

const SeatMap = () => {
    const SelectedSeatSave = JSON.parse(localStorage.getItem('selectedSeats'));
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState(SelectedSeatSave ? SelectedSeatSave : []);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get("https://localhost:7228/DMP/Ticket")
            .then((res) => {
                const listTicket = res.data.data.result;
                setTickets(listTicket);
            })
    }, []);

    // Get list of seats
    useEffect(() => {
        axios
            .get("https://localhost:7228/DMP/SeatBySchedule", {
                params: {
                    ScheduleId: id,
                },
            })
            .then((res) => {
                const listSeat = res.data?.data.result;
                // Sort seats by name
                listSeat.sort((a, b) => {
                    const aNameParts = a.name.split('');
                    const bNameParts = b.name.split('');
                    if (aNameParts[0] !== bNameParts[0]) {
                        return aNameParts[0].localeCompare(bNameParts[0]);
                    }
                    return parseInt(aNameParts.slice(1).join('')) - parseInt(bNameParts.slice(1).join(''));
                });
                // Map ticket type to seat
                const updatedSeats = listSeat.map(seat => {
                    const ticket = tickets.find(ticket => ticket.type === seat.type);
                    if (ticket) {
                        return {
                            ...seat,
                            price: ticket.price
                        };
                    }
                    return seat;
                });
                setSeats(updatedSeats);
            })
    }, [tickets]);

    const handleSeatSelect = selectedSeat => {
        const differentTypeSelected = selectedSeats.some(seat => seat.type !== selectedSeat.type);
        if (differentTypeSelected) {
            return alert("Bạn chỉ có thể chọn ghế cùng loại");
        }

        const seatIndex = selectedSeats.findIndex(seat => seat.id === selectedSeat.id);
        if (seatIndex !== -1) {
            const newSelectedSeats = [...selectedSeats];
            newSelectedSeats.splice(seatIndex, 1);
            setSelectedSeats(newSelectedSeats);
        } else {
            const ticket = tickets.find(ticket => ticket.type === selectedSeat.type);
            const price = ticket ? ticket.price : 0;
            setSelectedSeats([...selectedSeats, {...selectedSeat, price}]);
        }
    };


    const totalAmount = selectedSeats.reduce((total, seat) => {
        return total + seat.price;
    }, 0);

    // Group seats by first letter of name
    const seatGroups = seats.reduce((groups, seat) => {
        const groupName = seat.name.charAt(0);
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(seat);
        return groups;
    }, {});
    selectedSeats.sort((a, b) => {
        const aNameParts = a.name.split('');
        const bNameParts = b.name.split('');
        if (aNameParts[0] !== bNameParts[0]) {
            return aNameParts[0].localeCompare(bNameParts[0]);
        }
        return parseInt(aNameParts.slice(1).join('')) - parseInt(bNameParts.slice(1).join(''));
    });
    const seatColors = {
        1: "bg-green-300",
        2: "bg-orange-500",
        3: "bg-pink-500"
    };
    const handleClick = () => {
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
        localStorage.setItem('totalAmount', totalAmount);
        localStorage.setItem('StartTime', seats[0]?.startTime)
    }

    return (
        <div className="bg-[#001232] text-white">
            <Header></Header>
            {/*<img src="http://pixner.net/boleto/demo/assets/images/banner/banner04.jpg" alt="" className="h-[300px] w-full"/>*/}
            <div className="text-white max-w-screen-xl mx-auto mt-5">
                <div className="flex gap-3 font-bold text-xl">
                    <div>{seats[0]?.theaterName}</div> |
                    <div>{seats[0]?.roomName}</div>
                </div>
                <div className="flex gap-2 font-bold text-base">
                    <div>{new Date(seats[0]?.startTime).toLocaleDateString('en-GB')} {new Date(seats[0]?.startTime).toLocaleTimeString('en-GB', {hour12: false,})}</div> ~
                    <div>{new Date(seats[0]?.endTime).toLocaleDateString('en-GB')} {new Date(seats[0]?.endTime).toLocaleTimeString('en-GB', {hour12: false,})}</div>
                </div>
            </div>
            <img src="http://pixner.net/boleto/demo/assets/images/movie/screen-thumb.png" alt="" className="mx-auto my-16"/>
            <div className="grid grid-cols-10 gap-4 max-w-screen-xl mx-auto mt-5">
                {Object.entries(seatGroups).map(([groupName, groupSeats]) => (
                    <>
                        <div className="col-span-10 flex">
                            <div className="text-xl font-semibold mt-[5px] mr-4">{groupName}</div>
                            <div className="flex gap-4 mx-auto text-black" key={groupName}>
                                {groupSeats.map(seat => {
                                    return (
                                        <Seat
                                            className={seatColors[seat.type]}
                                            key={seat.id}
                                            seat={seat}
                                            onSeatSelect={handleSeatSelect}
                                            selectedSeats={selectedSeats}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ))}

            </div>
            <div className="max-w-screen-xl mx-auto mt-5">
                <div className="mt-4 flex bg-blue-500 rounded-lg p-5 text-center items-center">
                    <div className="flex w-[500px]">
                        <div className="mr-1">Selected Seats: </div>
                        <div className="grid gap-4">
                            <div className="rounded-md text-center">
                                {selectedSeats.sort().map((seat, index) => (
                                    <span key={seat.id}>{index > 0 && ', '}{seat.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-[500px]">
                        <div className="flex items-center">
                            <div className="mr-1">Tổng tiền: </div>
                            <div className="grid gap-4">{totalAmount.toLocaleString()}đ</div>
                        </div>
                    </div>
                    <NavLink to={`/nextpage/`} onClick={() => handleClick()} className="bg-green-500 py-2 px-5 border-2 rounded-lg">Tiếp tục</NavLink>
                </div>
            </div>
        </div>

    );
}
export default SeatMap;
