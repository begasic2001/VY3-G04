require('dotenv').config();
const paypal = require('paypal-rest-sdk');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'ARhBuYh6wfUOy2EqKQoowly9q3sFLJvFBvfWLOUwuH7P5gcVlzMejSUa_U8UCC0nPMT8wU7xDn3qufrc',
  client_secret:
    'EIr4EOEhAqSxTlIKvU9bp1mgljSGIwmTnqwNaR7WEMA_Kvk7AIpm7tJJC53CceKwjcSQVIskl8BdnfII',
});

class PaymentsController {
  //Just for Stripe, not Paypal
  async paymentStripe(req, res, next) {
    try {
      const amount = 2000;
      const paymentIntent = await stripe.paymentIntent.create({
        amount,
        currency: 'vnd',
        payment_method_types: ['card'],
        metadata: {
          name: 'testValue',
        },
      });
      const clientSecret = paymentIntent.client_secret;
      res.json({ clientSecret, msg: 'Payment initiated successfully!' });
    } catch (error) {
      console.log(error);
    }
    // const customer = await stripe.customers.create({
    // 	metadata: {
    // 		userId: req.body.userId,
    // 		cart: JSON.stringify(req.body.cartItems),
    // 	},
    // });

    const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: 'vnd',
          product_data: {
            noi_di: item.noi_di,
            noi_den: item.noi_den,
            tong_tien: item.tong_tien,
          },
        },
        so_luong: item.cartQuantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'KE'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'vnd',
            },
            display_name: 'Free shipping',
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Next day air',
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      // line_items,
      mode: 'payment',
      success_url: `http://localhost:9000/api/payment/success`,
      cancel_url: `http://localhost:9000/api/payment/cancel`,
    });

    // res.redirect(303, session.url);
    res.send({ url: session.url });
  }

  async paymentPayPal(req, res, next) {
    const item = req.body.items.map((a) => {
      return {
        noi_di: a.noi_di,
        noi_den: a.noi_den,
        so_luong: a.so_luong,
        don_gia: a.don_gia,
        tong_tien: a.tong_tien,
      };
    });
    const total = 0;
    for (let i = 0; i < item.length; i++) {
      total += item[i].don_gia * item[i].so_luong;
    }

    var create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:9000/api/payment/success',
        cancel_url: 'http://localhost:9000/api/payment/cancel',
      },
      transactions: [
        {
          item_list: {
            items: item,
          },

          amount: {
            currency: 'VND',
            total: total.toString(),
          },
          description: 'This is the payment description.',
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  }
  //get success paypal
  async success(req, res, next) {
    let payerID = req.query.PayerID;

    var execute_payment_json = {
      payer_id: payerID,
      transactions: [
        {
          amount: {
            currency: 'VND',
            total: total.toString(),
          },
        },
      ],
    };

    var paymentId = req.query.paymentId;
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          try {
            const ma_hoa_don = req.body.ma_hoa_don;
            const ma_khach_di = req.params.idKhach;
            const ma_chuyen_di = req.params.idChuyen;
            const tong_tien = req.body.tong_tien;
            const accessToken = req.headers.token.split(' ')[1];
            const decoded = jwt.verify(accessToken, accessKey);
            const trang_thai_dat = req.body.trang_thai_dat;
            const ngay_dat_ve = new Date();
            const sqlString2 =
              'INSERT INTO hoa_don (ma_hoa_don,ma_khach_di,ma_chuyen_di,email,ngay_dat_ve ,ngay_bat_dau,trang_thai_dat,so_luong,tong_tien) VALUES(@(ma_hoa_don,@ma_khach_di, @ma_chuyen_di,@email, @ngay_dat_ve, @ngay_bat_dau,@trang_thai_dat,@so_luong,@tong_tien)';
            return (
              pool
                .request()
                .input('ma_hoa_don', sql.Int, ma_hoa_don)
                .input('ma_khach_di', sql.Int, ma_khach_di)
                .input('ma_chuyen_di', sql.Int, ma_chuyen_di)
                .input('email', sql.NVarChar, decoded.email) //data1.ma_khach_dat
                .input('ngay_dat_ve', sql.Date, ngay_dat_ve)
                .input('ngay_bat_dau', sql.NVarChar, req.body.ngay_bat_dau)
                .input('trang_thai_dat', sql.NVarChar, trang_thai_dat)
                .input('so_luong', sql.Int, req.body.so_luong)
                .input('tong_tien', sql.Int, tong_tien)
                // .input("phuong_thuc", sql.NVarChar, formData.phuong_thuc)
                .query(sqlString2, async function (err3, data3) {
                  if (!err3) {
                    const sqlString3 = `UPDATE chuyen_di SET  so_luong='so_luong - ${req.body.so_luong}' Where ma_chuyen_di='${ma_chuyen_di}'`;
                    return pool
                      .request()
                      .query(sqlString3, async function (err4, data4) {
                        if (err4) {
                          console.log(err4);
                        } else {
                          res.json({
                            msg: 'Thêm hóa đơn thành công',
                            result: data4,
                            data3,
                          }); 
                        }
                      });
                  } else {
                    console.log(err3);
                  }
                })
            );
          } catch (err) {
            console.log(err);
          }
          // console.log(JSON.stringify(payment));
          // res.render("success");
        }
      }
    );
  }
  async cancel(req, res, next) {
    res.render('cancelled');
  }
}
module.exports = new PaymentsController();
