import React, { useRef, useState } from "react";
import Header from "./Header";
import Webcam from "react-webcam";
import { IoMdReverseCamera } from "react-icons/io";
import { FaCamera } from "react-icons/fa6";
import CameraOverlay from "./CameraOverlay.js";
import { RiVerifiedBadgeFill } from "react-icons/ri";

function Home() {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpCorrect, setOtpCorrect] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otpMessage, setOtpMessage] = useState("");
    const [name, setName] = useState("");
    const [nic, setNic] = useState("");
    const [imageFile, setImageFile] = useState(null); // Holds the captured image file
    const [sendingOtp, setSendingOtp] = useState(false); // State to track OTP sending status


    const openCamera = () => {
        setShowCamera(true);
    };

    const capturePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                // Convert the image to a File object
                const byteString = atob(imageSrc.split(',')[1]); // Decode base64 string
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uint8Array = new Uint8Array(arrayBuffer);

                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Create a Blob from the array buffer
                const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" }); // Convert to a File

                setCapturedImage(imageSrc);
                setImageFile(file); // Set the file as the image to be uploaded
                setShowCamera(false);
            }
        }
    };

    const handlePhoneNumberSubmit = async (e) => {
        e.preventDefault();

        setSendingOtp(true);

        const response = await fetch("https://demo.secretary.lk/sendSMSAPI/sendSMS.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mobile: phoneNumber,
                message: "Your OTP is 123456",
            }),
        });

        if (response.ok) {
            setOtpSent(true);
            setShowOtpInput(true);
            setOtpMessage("OTP sent to " + phoneNumber);
        } else {
            alert("Failed to send OTP");
        }
        setSendingOtp(false);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp === "123456") {
            setOtpCorrect(true);
            setShowOtpInput(false);
            alert("OTP verified!");
        } else {
            alert("Incorrect OTP");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("nic", nic);
        formData.append("image", imageFile); // Append the captured image as a file

        try {
            const response = await fetch("/register", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert("Registration successful: " + result.success);
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container mt-[6rem] max-w-full pt-3 pb-14 bg-[#f4f8fb] w-full absolute rounded-t-3xl h-auto">
                <form className="mx-8 pt-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                placeholder=" "
                                required
                            />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="nic"
                                value={nic}
                                onChange={(e) => setNic(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                placeholder=" "
                                required
                            />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NIC</label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                placeholder=" "
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                disabled={otpCorrect}
                            />
                            <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                            {otpCorrect && <RiVerifiedBadgeFill className="text-[#02bd4a] text-2xl mb-2" />}
                        </div>
                    </div>

                    {!otpSent && !otpCorrect && (
                        <button onClick={handlePhoneNumberSubmit} className="mt-8 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5" disabled={isSending}>
{sendingOtp ? "Sending..." : "Send OTP"}
                        </button>
                    )}

                    {otpSent && showOtpInput && !otpCorrect && (
                        <div className="flex flex-col items-center mt-4">
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Enter OTP"
                                required
                            />
                            <button onClick={handleOtpSubmit} className="mt-4 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                
                                Submit OTP
                            </button>

                        </div>
                    )}

                    {otpCorrect && (
                        <div className="text-center mt-8">
                            {capturedImage ? (
                                <div className="flex flex-row items-center gap-6">
                                    <img src={capturedImage} alt="Captured" className="w-auto h-40 my-4" />
                                    <button
                                        onClick={openCamera}
                                        className="text-white bg-[#00000033] hover:bg-gray-600 p-2.5 rounded-full"
                                    >
                                        <IoMdReverseCamera />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Take your photo</p>
                                    <button
                                        onClick={openCamera}
                                        className="bg-[#00000033] rounded-full w-auto p-3"
                                    >
                                        <FaCamera />
                                    </button>
                                </div>
                            )}

                            <button type="submit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Submit</button>
                        </div>
                    )}

                    {showCamera && <CameraOverlay setShowCamera={setShowCamera} capturePhoto={capturePhoto} webcamRef={webcamRef} />}
                </form>
            </div>
        </div>
    );
}

export default Home;
