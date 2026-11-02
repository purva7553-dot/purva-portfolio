const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
const modal = document.querySelector('.modal');

menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('.js-demo').forEach(b => {
    b.addEventListener('click', e => {
        e.preventDefault();
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('input').focus();
    });
});

document.querySelector('.close').addEventListener('click', close);

modal.addEventListener('click', e => {
    if (e.target === modal) {
        close();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        close();
    }
});

document.querySelectorAll('.lead-form').forEach(f => {
    f.addEventListener('submit', e => {
        e.preventDefault();

        const b = f.querySelector('button');

        b.textContent = 'Thank you! We will call you.';
        b.disabled = true;

        setTimeout(close, 1600);
    });
});

const formatNumber = value => {
    return new Intl.NumberFormat('en-IN').format(value);
};

const animateCounter = element => {
    const target = Number(element.dataset.target);
    const duration = 1350;
    const start = performance.now();

    const tick = now => {
        const progress = Math.min(
            (now - start) / duration,
            1
        );

        const eased = 1 - Math.pow(1 - progress, 4);

        element.textContent =
            formatNumber(Math.round(target * eased)) +
            (element.dataset.suffix || '');

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    };

    requestAnimationFrame(tick);
};

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(animateCounter);
            counterObserver.disconnect();
        }
    }),
    {
        threshold: 0.45
    }
);

if (counters.length) {
    counterObserver.observe(document.querySelector('.stats'));
}

const revealObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    }),
    {
        threshold: 0.14
    }
);

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

const callbackForm = document.querySelector('.callback-form');

if (callbackForm) {
    callbackForm.addEventListener('submit', event => {
        event.preventDefault();

        const button = callbackForm.querySelector('button');

        button.textContent = 'Request Sent';
        button.disabled = true;

        callbackForm.reset();
    });
}

