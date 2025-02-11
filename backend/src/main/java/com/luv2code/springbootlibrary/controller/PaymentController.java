package com.luv2code.springbootlibrary.controller;

import com.luv2code.springbootlibrary.dao.PaymentRepository;
import com.luv2code.springbootlibrary.entity.Payment;
import com.luv2code.springbootlibrary.requestmodels.PaymentInfoRequest;
import com.luv2code.springbootlibrary.service.PaymentService;
import com.luv2code.springbootlibrary.utils.JwtUtils;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {

    private PaymentService paymentService;
    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentController(PaymentService paymentService, PaymentRepository paymentRepository) {
        this.paymentService = paymentService;
        this.paymentRepository = paymentRepository;
    }

    @GetMapping("/fees")
    public ResponseEntity<?> getUserFees(@RequestHeader(value = "Authorization") String token) {
        String userEmail = JwtUtils.getClaim(token, "email");
        Payment payment = paymentRepository.findByUserEmail(userEmail);

//        if (payment == null) {
//            return new ResponseEntity<>("No fees found for this user.", HttpStatus.NOT_FOUND);
//        }

        return ResponseEntity.ok(payment.getAmount());
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest)
        throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value = "Authorization") String token)
        throws Exception {
        String userEmail = JwtUtils.getClaim(token, "email");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }
}
