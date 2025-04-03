import React, { useRef, useState } from "react";
import Header from "./Header.js";
import Webcam from "react-webcam";
import { IoMdReverseCamera } from "react-icons/io";
import { FaCamera } from "react-icons/fa6";
import CameraOverlay from "./CameraOverlay.js";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Web() {
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
    const [mail, setMail] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [imageFile, setImageFile] = useState(null); // Holds the captured image file
    const [sendingOtp, setSendingOtp] = useState(false); // State to track OTP sending status

    const [enteredOtp, setEnteredOtp] = useState(""); // To store user input
    const navigate = useNavigate();

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

    const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

    const handlePhoneNumberSubmit = async (e) => {
        e.preventDefault();
        setSendingOtp(true); // Set loading state

        const generatedOtp = generateOtp();
        setOtp(generatedOtp); // Save OTP in state

        try {
            const responseStatus = await fetch(`https://apps.hayleysfentons.com/icewarp/API/client.php?MOBILE_NO=${phoneNumber}`);
            const data = await responseStatus.json();

            if (data?.data && data.data.OTP_STATE === 1) {
                navigate(`/reg/${encodeURIComponent(data.data.CLIENT_NAME)}/${encodeURIComponent(data.data.TABLE_NUMBER)}`);
            }
            else {
                const response = await fetch("https://demo.secretary.lk/sendSMSAPI/sendSMS.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mobile: phoneNumber,
                        message: `Your OTP is ${generatedOtp}`,
                    }),
                });

                if (response.ok) {
                    setOtpSent(true);
                    setShowOtpInput(true);
                    toast.success("OTP sent to " + phoneNumber);
                } else {
                    toast.error("Failed to send OTP");
                }
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An error occurred while sending OTP");
        } finally {
            setSendingOtp(false); // Reset loading state after response
        }
    };


    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (enteredOtp === String(otp)) { // Compare with stored OTP
            try {
                // Fetch client data
                const response = await fetch(`https://apps.hayleysfentons.com/icewarp/API/client.php?MOBILE_NO=${phoneNumber}`);
                const data = await response.json();

                console.log(data.status, data.data?.CLIENT_NAME)
                if (data.status === "success" && data.data?.CLIENT_NAME) {
                    // Update OTP_STATE to 1
                    const updateResponse = await fetch("https://apps.hayleysfentons.com/icewarp/API/client.php", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            MOBILE_NO: phoneNumber,
                            OTP_STATE: 1
                        }),
                    });

                    const updateResult = await updateResponse.json();
                    console.log("OTP_STATE Update Response:", updateResult);

                    if (updateResult.status === "success") {
                        console.log("OTP verified and updated successfully!");
                        navigate(`/reg/${encodeURIComponent(data.data.CLIENT_NAME)}/${encodeURIComponent(data.data.TABLE_NUMBER)}`);

                        const responseMsg = await fetch("https://demo.secretary.lk/sendSMSAPI/sendSMS.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                mobile: phoneNumber,
                                message: `Thank you for your participation. We look forward to future opportunities to collaborate with you.\n\nYour table number is ${data.data.TABLE_NUMBER}`,
                            }),
                        });

                    } else {
                        console.error("Failed to update OTP state.");
                    }
                }

                setOtpCorrect(true);
                setShowOtpInput(false);
            } catch (error) {
                console.error("Error verifying OTP:", error);
                toast.error("Failed to verify client. Please try again.");
            }
        } else {
            toast.error("Incorrect OTP");
        }
    };





    // const handleSubmit = async (e) => {
    //     e.preventDefault();


    //     navigate(`/reg/${name}/null`)
    //     // const formData = new FormData();
    //     // formData.append("name", name);
    //     // formData.append("nic", nic);
    //     // formData.append("phn_no", phoneNumber);
    //     // // formData.append("image", imageFile); // Append the captured image as a file

    //     // try {
    //     //     const response = await fetch("https://demo.secretary.lk/fr_apis/face_registration.php", {
    //     //         method: "POST",
    //     //         body: formData,
    //     //     });

    //     //     const result = await response.json();

    //     //     if (result.success) {
    //     //         toast.success("Registration successful");

    //     //         // Reset the form state
    //     //         setName("");
    //     //         setNic("");
    //     //         setPhoneNumber("");
    //     //         setOtp("");
    //     //         setOtpSent(false);
    //     //         setOtpCorrect(false);
    //     //         setCapturedImage(null);
    //     //         setImageFile(null);
    //     //         setShowOtpInput(false);
    //     //         setOtpMessage("");
    //     //     } else if (result.error) {
    //     //         toast.error("NIC already registered!");
    //     //         console.error("Error:", result.error, result.message || "");
    //     //     }
    //     // } catch (error) {
    //     //     console.error("Error during form submission:", error);
    //     //     toast.error("An unexpected error occurred. Please try again.");
    //     // }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            CLIENT_NAME: name,
            EMAIL_ADDRESS: mail,
            MOBILE_NO: phoneNumber,
            CLIENT_COMPANY: company,
            DESIGNATION: designation,
            EVENT_ID: 1,
            COMPANY_ID: 1,
            OTP_STATE: 1
        };

        console.log("Sending request:", requestData);

        try {
            const response = await fetch("https://apps.hayleysfentons.com/icewarp/API/client.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            navigate(`/reg/${name}/null`);

            const responseMsg = await fetch("https://demo.secretary.lk/sendSMSAPI/sendSMS.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mobile: phoneNumber,
                    message: `Thank you for your participation. We look forward to future opportunities to collaborate with you.\n\n sit with your colleague`,
                }),
            });

            // Log the raw response before trying to parse it
            const textResponse = await response.text();
            console.log("Raw Response:", textResponse);

            // Attempt to parse JSON
            const result = JSON.parse(textResponse);

            if (result.success) {
                toast.success("Registration successful!");


                // Reset form fields
                setName("");
                setMail("");
                setPhoneNumber("");
                setCompany("");
                setDesignation("");
            } else {
                // toast.error(result.message || "An error occurred.");
                console.error("Error:", result.error);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            // toast.error("An unexpected error occurred. Please try again.");
        }
    };


    return (
        <div>
            <Header />
            <ToastContainer
                position="top-center"
                toastClassName="rounded-full w-auto px-4 mx-6 mt-4 text-xs py-[-16rem] bg-white text-black/60 font-bold shadow-[4px_4px_9px_0px_#00000082]"
                className="custom-toast"
                bodyClassName="custom-toast-body"
                draggable
                hideProgressBar
                closeButton={false}
            />
            <div
                className={`container ${otpSent ? "mt-[18rem]" : "mt-[24rem]"
                    } mx-24 pt-3 pb-14 bg-[#f8f8ff] w-full absolute rounded-t-3xl h-auto`}
            >
                {!otpCorrect && (
                    <h1 class="keyboard text-center mt-[10px] text-[35px]">Ready to explore?</h1>
                )}
                <form className="mx-8 pt-8" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">

                    </div>

                    <div className="relative z-0 w-full mb-5 group flex flex-col gap-x-2">

                        <label for="zip-input" class="block mb-2 text-sm font-medium text-gray-700 ">Enter your registered phone number</label>
                        <div class="relative w-full flex items-center">
                            <div class="absolute mt-2 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <h1 class=" w-4 h-4 text-gray-500 dark:text-gray-400" >
                                    +94</h1>
                            </div>
                            <input
                                value={phoneNumber}
                                onChange={(e) => {
                                    const inputVal = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                    if (inputVal.length <= 10) {
                                        setPhoneNumber(inputVal);
                                    }
                                }}
                                required
                                disabled={otpSent}
                                type="number"
                                id="zip-input"
                                aria-describedby="helper-text-explanation"
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                              focus:ring-purple-800 focus:border-purple-800 block ps-16 p-2.5"
                                placeholder="7X XXX XXXX"
                                maxLength={10}
                                pattern="^\d{10}$"
                            />

                            {otpCorrect && (
                                <div className="flex items-center justify-center mt-2 ml-2 z-50 right-2 ">
                                    <span className="text-green-500 text-2xl mb-2"><RiVerifiedBadgeFill /></span>
                                    {/* <p className="ml-2">OTP verified</p> */}
                                </div>
                            )}

                        </div>




                    </div>

                    {!otpSent && !otpCorrect && (
                        <div>
                            <button
                                onClick={handlePhoneNumberSubmit}
                                className="mt-8 w-full text-white bg-[#791c97] hover:bg-[#791c80] font-medium rounded-lg text-sm px-5 py-2.5"
                                disabled={sendingOtp || phoneNumber.length < 9}
                            >
                                {sendingOtp ? "Please wait..." : "Submit"}
                            </button>
                        </div>
                    )}





                    {otpSent && showOtpInput && !otpCorrect && (
                        <div class="flex justify-center">

                            <div class="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                                <header class="mb-8">
                                    <h1 class="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
                                    <p class="text-[15px] text-slate-500">Enter the 6-digit verification code that was sent to your phone number.</p>
                                </header>
                                <form id="otp-form">
                                    <div class="flex items-center justify-center gap-3">
                                        <input
                                            type="text" // Changed from "number" to "text"
                                            value={enteredOtp}
                                            onChange={(e) => {
                                                const inputVal = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                                if (inputVal.length <= 6) {
                                                    setEnteredOtp(inputVal);
                                                }
                                            }}
                                            className="border w-4/5 p-2 rounded border-gray-300 focus:ring-[#791c97] focus:ring-0"
                                            placeholder="Enter OTP"
                                            maxLength={6} // Restricts input to 6 characters
                                            pattern="^\d{6}$"
                                            required
                                        />

                                    </div>
                                    <div class="max-w-[260px] mx-auto mt-4">
                                        <button type="submit"
                                            onClick={handleOtpSubmit}
                                            class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#791c97] hover:bg-[#791c80] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">Verify
                                            Account</button>
                                    </div>
                                </form>
                                <div class="text-sm text-slate-500 mt-4">Didn't receive code? <button onClick={handlePhoneNumberSubmit} class="font-medium text-[#791c97] hover:text-[#791c80]" href="#0">{sendingOtp ? "Resending..." : "Resend"}</button></div>
                            </div>

                        </div>
                    )}

                    {otpCorrect && (
                        <div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-[#791c97] focus:outline-none focus:ring-0 focus:border-[#791c97] peer"
                                        placeholder=" "
                                        required
                                    // disabled={otpCorrect}
                                    />
                                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#791c97] peer-focus:dark:text-[#791c97] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="email"
                                        name="mail"
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-[#791c97] focus:outline-none focus:ring-0 focus:border-[#791c97] peer"
                                        placeholder=" "
                                        required
                                    // disabled={otpCorrect}
                                    />
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#791c97] peer-focus:dark:text-[#791c97] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-[#791c97] focus:outline-none focus:ring-0 focus:border-[#791c97] peer"
                                        placeholder=" "
                                        required
                                    // disabled={otpCorrect}
                                    />
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#791c97] peer-focus:dark:text-[#791c97] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="text"
                                        name="designation"
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-300 dark:focus:border-[#791c97] focus:outline-none focus:ring-0 focus:border-[#791c97] peer"
                                        placeholder=" "
                                        required
                                    // disabled={otpCorrect}
                                    />
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#791c97] peer-focus:dark:text-[#791c97] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Designation</label>
                                </div>

                                {/* {capturedImage ? (
                                    <div className="flex flex-row items-center gap-6">
                                        <img src={capturedImage} alt="Captured" className="w-auto h-40 my-4" />
                                        <button
                                            onClick={openCamera}
                                            // value={imageFile}
                                            // onChange={(e) => setCapturedImage(e.target.value)}
                                            className="text-white bg-[#00000033] hover:bg-gray-600 p-2.5 rounded-full"
                                            type="button"
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
                                            type="button"
                                        >
                                            <FaCamera />
                                        </button>
                                    </div>
                                )} */}
                            </div>

                            <div className="text-center mt-8">

                                <button type="submit" className="mt-8 text-white bg-[#791c97] hover:bg-[#791c80] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                            </div>
                        </div>
                    )}

                    {showCamera && <CameraOverlay setShowCamera={setShowCamera} capturePhoto={capturePhoto} webcamRef={webcamRef} />}


                </form>
                {/* <p className="fixed bottom-0 w-full text-center py-2 text-gray-400">
                    SmartConnect product
                </p> */}

            </div>

        </div>
    );
}

export default Web;
