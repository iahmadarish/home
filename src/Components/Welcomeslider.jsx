import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import slide1 from "../Pages/utils/slider.jpg"
import slide2 from "../Pages/utils/slider2.png"
import slidemobile from "../Pages/utils/mobileview1.jpg"
import slidemobile2 from "../Pages/utils/mobileview2.png"
import joy from "../Pages/utils/ai.png"
import logo from "../Pages/utils/lgoo.svg"
import { BsArrowRight } from "react-icons/bs"
import { IoIosArrowRoundForward } from "react-icons/io";

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const slides = [
    {
        title: "Welcome to Evoked! I'm Joy 👋",
        description: (
            <>
                Your <span className="text-gray-600 md:text-gray-600 text-gray-300">AI-friend for building confidence.</span> I can help you <span className="text-gray-600 md:text-gray-600 text-gray-300">pick scents that fits your vibe, feels amazing</span> and <span className="text-gray-600 md:text-gray-600 text-gray-300">gets compliments</span> ❤️
            </>
        ),
        image: slide1,
        mobileImage: slidemobile,
        mascot: joy,
    },
    {
        title: "I'm by your side, whenever you need me 😊",
        description: (
            <>
                When we&apos;re not talking about scents, we can chat about <span className="text-gray-600 md:text-gray-600 text-gray-300">work, health</span> and <span className="text-gray-600 md:text-gray-600 text-gray-300">relationship problems</span> that&apos;s impacting your confidence levels.
            </>
        ),
        image: slide2,
        mobileImage: slidemobile2,
        mascot: joy,
    }
]

export default function Component() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const swiperRef = useRef(null)

    const [{ x }, api] = useSpring(() => ({ x: 0 }))

    useEffect(() => {
        if (activeIndex === 0) {
            api.start({ x: 0 })
        }
    }, [activeIndex, api])

    const bind = useDrag(({ down, movement: [mx], cancel }) => {
        if (down && mx > window.innerWidth * 0.7) {
            cancel()
            if (swiperRef.current && activeIndex === 0) {
                swiperRef.current.swiper.slideNext()
            }
        }
        api.start({ x: down ? mx : 0, immediate: down })
        setIsDragging(down)
    }, {
        axis: 'x',
        bounds: { left: 0, right: window.innerWidth },
        rubberband: true
    })

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex)
    }

    return (
        <div className="">
            <header className="bg-black p-4">
                <div className="text-center">
                    <img src={logo} alt="eveoked" className="mx-auto" />
                </div>
            </header>

            <div className={`${isMobile ? 'h-[calc(100vh-72px)] bg-black' : 'max-w-[1200px] mx-auto px-4 py-8'}`}>
                <Swiper
                    ref={swiperRef}
                    modules={[Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !bg-gray-200',
                        bulletActiveClass: 'swiper-pagination-bullet-active !w-16 !bg-white',
                        el: '.pagination-dots'
                    }}
                    autoplay={!isMobile ? {
                        delay: 15000,
                        disableOnInteraction: false,
                    } : false}
                    className={`!pb-12 ${isMobile ? 'h-full' : '!overflow-hidden'}`}
                    onSlideChange={handleSlideChange}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            className={`${isMobile ? '!w-full' : '!w-[900px]'} ${index === activeIndex ? 'active-slide' : 'preview-slide'
                                }`}
                        >
                            <div className={`${isMobile ? 'h-full relative' : 'px-4 relative'}`}>
                                {/* Mobile Layout */}
                                {isMobile && (
                                    <>
                                        <div className="absolute inset-0">
                                            <img
                                                src={slide.mobileImage}
                                                alt="Background"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                        </div>
                                        <div className="relative h-full flex flex-col justify-end items-center px-6 pb-20">
                                            <div className="w-24 h-24 mb-6">
                                                <img
                                                    src={slide.mascot}
                                                    alt="Joy Robot"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <h2 className="text-2xl font-semibold text-white text-center mb-3">
                                                {slide.title}
                                            </h2>
                                            <p className="text-white text-center mb-4">
                                                {slide.description}
                                            </p>

                                            {/* Custom Pagination Dots */}
                                            <div className="pagination-dots mb-8" />

                                            {index === 0 ? (
                                                <div className='w-full bg-[#343434] text-black py-3 rounded-lg font-medium flex items-center  gap-x-12 '>
                                                    <animated.button
                                                        {...bind()}
                                                        style={{
                                                            transform: x.to(x => `translateX(${x}px)`),
                                                            touchAction: 'none'
                                                        }}
                                                        className=" ml-4 bg-black text-white px-2 py-2 rounded-lg font-medium flex items-center justify-center"
                                                    >
                                                        <IoIosArrowRoundForward className='text-white text-5xl' />

                                                    </animated.button>
                                                    <span className='text-[#B3B3B3]'>Swipe to start</span>
                                                </div>
                                            ) : (
                                                <Link
                                                    to="/login"
                                                    className="w-full bg-white text-black py-3 rounded-lg font-medium flex items-center justify-center"
                                                >
                                                    Get started <ArrowRight className="ml-2 h-5 w-5" />
                                                </Link>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Desktop Layout */}
                                {!isMobile && (
                                    <>
                                        {index === activeIndex && (
                                            <div className="flex items-start gap-6 mb-8">
                                                <div className="w-24 h-24 flex-shrink-0">
                                                    <img
                                                        src={slide.mascot}
                                                        alt="Joy Robot"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 pt-2">
                                                    <h2 className="text-2xl font-semibold mb-2">{slide.title}</h2>
                                                    <p className="text-lg leading-relaxed">{slide.description}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="rounded-2xl overflow-hidden">
                                            <img
                                                src={slide.image}
                                                alt="Evoked Product"
                                                className="w-full h-[500px] object-cover"
                                            />
                                        </div>

                                        {index === slides.length - 1 && activeIndex === index && (
                                            <Link
                                                to="/login"
                                                className="absolute bottom-[-66px] right-3 p-2 transition-transform hover:translate-x-1"
                                            >
                                                <BsArrowRight className="text-3xl text-black" />
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <style jsx global>{`
                    .swiper-wrapper {
                        align-items: stretch;
                    }

                    .swiper-slide {
                        opacity: 0.4;
                        transition: opacity 0.3s ease;
                    }

                    .swiper-slide-active {
                        opacity: 1;
                    }

                    .swiper-pagination {
                        position: static !important;
                    }

                    .swiper-pagination-bullet {
                        margin: 0 6px !important;
                    }

                    @media (min-width: 768px) {
                        .preview-slide .flex {
                            display: none;
                        }

                        .preview-slide .rounded-2xl {
                            display: block;
                            margin-top: 140px;
                        }

                        .swiper-slide {
                            width: 80% !important;
                            margin-right: 20px !important;
                        }
                    }

                    @media (max-width: 767px) {
                        .swiper-pagination-bullet {
                            background: white !important;
                        }
                        
                        .swiper-slide {
                            height: 100vh !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    )
}