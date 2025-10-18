// بيانات الفعاليات
const eventsData = [
    {
        id: 1,
        title: "مهرجان الموسيقى السنوي",
        category: "موسيقى",
        date: "2024-03-15",
        location: "قصر المؤتمرات - دمشق",
        description: "استمتع بأمسية موسيقية رائعة مع أشهر الفنانين المحليين والعالميين في أضخم مهرجان موسيقي بالمدينة.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        featured: true
    },
    
   
    {
        id: 2,
        title: "معرض الفنون التشكيلية",
        category: "فنون",
        date: "2024-04-05",
        location: "المتحف الوطني - دمشق",
        description: "استكشاف لأعمال فنية مذهلة لفنانين محليين ودوليين في مختلف المجالات.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        featured: true
    },
    {
        id: 3,
        title: "حفل موسيقى الجاز الليلي",
        category: "موسيقى",
        date: "2024-04-12",
        location: "قصر المؤتمرات - دمشق",
        description: "أمسية استثنائية لمحبي موسيقى الجاز مع أشهر العازفين المحليين.",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        featured: false
    },
    {
        id: 4,
        title: "بطولة كرة السلة للشباب",
        category: "رياضة",
        date: "2024-04-18",
        location: "جامعة دمشق",
        description: "منافسة قوية بين فرق الشباب المحلية على لقب بطولة المدينة.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        featured: false
    },
    {
        id: 5,
        title: "مهرجان المأكولات الشامية",
        category: "طعام",
        date: "2024-04-25",
        location: "ساحة الأمويين - دمشق",
        description: "استمتع بأشهر المأكولات الشامية التقليدية من أفضل المطاعم والمطابخ المنزلية في دمشق.",
        image: "https://images.stockcake.com/public/7/e/5/7e59b229-0f1f-4a65-b6fd-04caa5dcd205_large/chefs-preparing-food-stockcake.jpg",
        featured: false
    },
    {
        id: 6,
        title: "معرض الحرف اليدوية",
        category: "فنون",
        date: "2024-05-22",
        location: "مديرية الثقافة - دمشق",
        description: "عرض للحرف اليدوية التقليدية السورية من فنون الزجاج والنحاس والتطريز.",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        featured: false
    }
];

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إذا كانت الصفحة الرئيسية
    if(document.getElementById('featuredEventsGrid')) loadFeaturedEvents();
    if(document.getElementById('latestEventsGrid')) loadLatestEvents();
    if(document.querySelector('.newsletter-form')) setupNewsletterForm();
    setupScrollEffects(); // تأثيرات التمرير
});

// ------------------- الوظائف المشتركة -------------------

// إنشاء بطاقة فعالية (يمكن استخدامها لجميع الصفحات)
function createEventCard(event, options = { includeShare: false }) {
    const categoryColor = getCategoryColor(event.category);
    const formattedDate = formatDate(event.date);
    
    return `
    <div class="col-lg-3 col-md-6">
        <div class="event-card">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}" class="img-fluid">
                <span class="event-category" style="background: ${categoryColor}">${event.category}</span>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <span><i class="fas fa-calendar me-1"></i> ${formattedDate}</span>
                    <span><i class="fas fa-map-marker-alt me-1"></i> ${event.location}</span>
                </div>
                ${options.includeShare ? `
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="shareEvent('${event.title}')">
                        <i class="fas fa-share-alt me-1"></i>مشاركة
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
    </div>`;
}

// إنشاء بطاقة فعالية مع زر المشاركة (لصفحة الفعاليات)
function createEventCardWithShare(event) {
    return createEventCard(event, { includeShare: true });
}

// لون التصنيف
function getCategoryColor(category) {
    const colors = {
        "موسيقى": "#f72585",
        "رياضة": "#4cc9f0", 
        "طعام": "#f8961e",
        "فنون": "#7209b7",
        "ثقافة": "#4361ee"
    };
    return colors[category] || "#6c757d";
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
}

// عرض الفعاليات البارزة في الصفحة الرئيسية
function loadFeaturedEvents() {
    const featuredEventsGrid = document.getElementById('featuredEventsGrid');
    const featuredEvents = eventsData.filter(event => event.featured);
    
    featuredEventsGrid.innerHTML = '';
    featuredEvents.forEach(event => {
        featuredEventsGrid.innerHTML += createEventCard(event);
    });
}

// عرض أحدث الفعاليات في الصفحة الرئيسية
function loadLatestEvents() {
    const latestEventsGrid = document.getElementById('latestEventsGrid');
    const latestEvents = eventsData.slice(0, 8);
    
    latestEventsGrid.innerHTML = '';
    latestEvents.forEach(event => {
        latestEventsGrid.innerHTML += createEventCard(event);
    });
}

// نموذج النشرة البريدية
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`شكراً لاشتراكك! سيتم إرسال التحديثات إلى ${email}`);
            this.reset();
        });
    }
}

// تأثيرات التمرير والظهور للعناصر
function setupScrollEffects() {
    // الشريط العلوي
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if(navbar) {
            if(window.scrollY > 100) 
                navbar.classList.add('navbar-scrolled');
            else 
                navbar.classList.remove('navbar-scrolled');
        }
    });

    // ظهور البطاقات
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) 
                entry.target.classList.add('animate-in');
        });
    }, observerOptions);

    document.querySelectorAll('.event-card, .category-card').forEach(el => {
        observer.observe(el);
    });
}

// مشاركة فعالية
function shareEvent(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'تفضل بحضور هذه الفعالية المميزة',
            url: window.location.href
        });
    } else {
        alert(`يمكنك مشاركة هذه الفعالية: ${title}`);
    }
}

// إضافة تأثيرات CSS للظهور والتمرير
(function addGlobalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .event-card, .category-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .event-card.animate-in, .category-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar-scrolled {
            background: rgba(255,255,255,0.95) !important;
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);
})();


// === Language & Direction Toggle (minimal) ===
(function(){
  const dict = {
    ar: { _dir:'rtl', _lang:'ar', nav_home:'الرئيسية', nav_events:'الفعاليات', nav_details:'التفاصيل', nav_about:'عن الدليل', nav_contact:'اتصل بنا' },
    en: { _dir:'ltr', _lang:'en', nav_home:'Home', nav_events:'Events', nav_details:'Details', nav_about:'About', nav_contact:'Contact' }
  };
  const lnAr = document.getElementById('langAr');
  const lnEn = document.getElementById('langEn');

  function swapBootstrapCss(dir){
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.includes('bootstrap') && href.includes('.min.css')) {
        if (dir === 'ltr' && href.includes('rtl')) link.href = href.replace(/\.rtl(\.min)?\.css/, '.min.css');
        else if (dir === 'rtl' && !href.includes('rtl')) link.href = href.replace('.min.css', '.rtl.min.css');
      }
    });
  }

  function applyLang(langKey){
    const d = dict[langKey] || dict.ar;
    document.documentElement.setAttribute('lang', d._lang);
    document.documentElement.setAttribute('dir', d._dir);
    swapBootstrapCss(d._dir);
    const map = {
      'a[href="index.html"]': d.nav_home,
      'a[href="events.html"]': d.nav_events,
      'a[href="event.html"]': d.nav_details,
      'a[href="about.html"]': d.nav_about,
      'a[href="contact.html"]': d.nav_contact
    };
    Object.entries(map).forEach(([sel, txt]) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = txt;
      document.querySelectorAll('footer '+sel).forEach(e => e.textContent = txt);
    });
    localStorage.setItem('cityEventsLang', langKey);
    if (lnAr && lnEn) {
      lnAr.setAttribute('aria-pressed', langKey === 'ar' ? 'true' : 'false');
      lnEn.setAttribute('aria-pressed', langKey === 'en' ? 'true' : 'false');
    }
  }

  const saved = localStorage.getItem('cityEventsLang') || 'ar';
  applyLang(saved);
  if (lnAr) lnAr.addEventListener('click', () => applyLang('ar'));
  if (lnEn) lnEn.addEventListener('click', () => applyLang('en'));
})();
