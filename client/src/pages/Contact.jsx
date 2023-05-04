import React from 'react'


const Contact = () => {

    function handleSubmit() {
        alert("We will get back to you in 2-3 business days")
    }


    return (
        <>
            <main className="py-5 bg-danger-subtle">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <h2 className="mb-4 text-center">Get in Touch</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Your Name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Your Email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input type="text" className="form-control" id="subject" placeholder="Subject" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" rows="5" required></textarea>
                                </div>
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Contact

