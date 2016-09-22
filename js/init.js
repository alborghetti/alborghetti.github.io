(function($) {
    $(function() {

        $('.button-collapse').sideNav({
            closeOnClick: true
        });

        $(document).ready(function() {
            $('.scrollspy').scrollSpy({ scrollOffset: 50 });
        });

        $(document).ready(function() {
            $('.collapsible').collapsible({
                accordion: false
            });
        });

        $(document).ready(function() {
            $(".collapsible-header").click(function() {
                $(".collapsible-more", this).toggle();
                $(".collapsible-less", this).toggle();
            });
        });

        $(document).ready(function() {
            $('.parallax').parallax();
        });


        //Contact Form
        $("#contactForm").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                formError();
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                // everything looks good!
                event.preventDefault();
                submitForm();
            }
        });

        function submitForm() {
            // Initiate Variables With Form Content
            var name = $("#name").val();
            var email = "mailto://" + $("#email").val();
            var subject = $("#subject").val();
            var message = $("#textarea").val();

            //var requestBody = "`name`" + name + "`email`" + email + "`subject`" + subject + "`message`" + message + ".";

            var requestBody = {
                "text": "New contact message",
                "channel": "#contacts",
                "username": "webhookbot",
                "attachments": [{
                    "author_name": name,
                    "author_link": email,
                    "title": subject,
                    "text": message
                }]
            };

            var sRequestBody = JSON.stringify(requestBody);
            //Sending contact messages to dedicated channel on Slack
            jQuery.post('https://hooks.slack.com/services/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',
                sRequestBody,
                function(data) {
                    if (data === "ok") {
                        formSuccess();
                    } else {
                        formError();
                        submitMSG(false, "Something went wrong, please retry later");
                    }
                });

        }

        function formSuccess() {
            $("#contactForm")[0].reset();
            submitMSG(true, "Message Sent!")
        }

        function formError() {
            $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                function() {
                    $(this).removeClass();
                });
        }

        function submitMSG(valid, msg) {
            var msgClasses = "";
            if (valid) {
                msgClasses = "center-align fadeInUp animated green-text";
            } else {
                msgClasses = "center-align red-text";
            }
            $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        }

    }); // end of document ready
})(jQuery); // end of jQuery name space