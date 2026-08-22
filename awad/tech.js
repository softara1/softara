/* ============================================================
   عوض تك - مكتبة التحميل الرقمية المتكاملة مع المنتدى
   JavaScript خارجي - يعمل داخل #awad-download-library
   يدعم: الإدارة الحقيقية عبر المنتدى، التعليقات، التحميل متعدد الأجزاء،
   البحث، الفلاتر، الفرز، المفضلة، الوضع الليلي، اللغة، وغيرها.
   ملاحظة أمنية: الصلاحيات تُحدد من وجود روابط النشر في صفحات المنتدى
   وليس من LocalStorage. يجب تعزيز الأمان في Backend المنتدى نفسه.
============================================================ */
(function() {
    'use strict';

    const root = document.getElementById('awad-download-library');
    if (!root) return;

    // ===== إعدادات المنتدى =====
    const DL_FORUM_ID = 20; // رقم القسم المخصص للمكتبة في المنتدى

    // ===== إعدادات عامة =====
    const defaultLang = root.dataset.lang || 'ar';
    const defaultTheme = root.dataset.theme || 'light';
    const PAGE_SIZE = 6;
    const STORAGE_KEYS = {
        lang: 'awad_lang',
        theme: 'awad_theme',
        favorites: 'awad_favs',
        recent: 'awad_recent'
    };

    let currentLang = localStorage.getItem(STORAGE_KEYS.lang) || defaultLang;
    let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || defaultTheme;
    let isAdmin = false;

    const state = {
        query: '',
        sort: 'latest',
        visibleCount: PAGE_SIZE,
        favorites: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || '[]')),
        selected: new Set(),
        recentlyViewed: JSON.parse(localStorage.getItem(STORAGE_KEYS.recent) || '[]'),
        filters: {
            platform: [],
            category: [],
            type: [],
            price: [],
            size: [],
            downloadType: [],
            status: [],
            favoritesOnly: false
        },
        modalPartsSelection: new Set(),
        allTopicsData: [],
        sectionPages: { software: 1, app: 1, pcgame: 1, psgame: 1, ebook: 1 },
        loading: false,
        currentEditingTopic: null
    };

    // ===== الترجمات الكاملة =====
    const translations = {
        ar: {
            app_name: 'عوض تك',
            app_name_en: 'Awad Tech',
            nav_home: 'الرئيسية',
            nav_categories: 'التصنيفات',
            nav_featured: 'مميزة',
            nav_library: 'المكتبة',
            nav_popular: 'الأكثر تحميلًا',
            nav_favorites: 'المفضلة',
            hero_title: 'مكتبة البرامج والتطبيقات الرقمية',
            hero_subtitle: 'حمّل أحدث برامج Windows وتطبيقات Android وiOS والكتب الإلكترونية والأدوات بسرعة وأمان.',
            search_placeholder: 'ابحث عن برنامج، تطبيق، كتاب...',
            search_btn: 'بحث',
            stats_programs: 'برامج',
            stats_apps: 'تطبيقات',
            stats_books: 'كتب',
            stats_files: 'ملفات',
            categories_title: 'التصنيفات',
            featured_title: 'مميزة',
            library_title: 'المكتبة',
            popular_title: 'الأكثر تحميلًا',
            latest_title: 'أحدث الإضافات',
            favorites_title: 'المفضلة',
            recently_viewed: 'المشاهدات الأخيرة',
            admin_panel: 'لوحة الإدارة',
            add_new_item: 'إضافة عنصر جديد',
            filter_toggle: 'فلاتر',
            reset_filters: 'إعادة تعيين',
            sort_label: 'ترتيب:',
            sort_latest: 'الأحدث',
            sort_oldest: 'الأقدم',
            sort_downloads: 'الأكثر تحميلًا',
            sort_popular: 'الأكثر شعبية',
            sort_name_asc: 'الاسم A-Z',
            sort_name_desc: 'الاسم Z-A',
            sort_size_asc: 'الحجم من الأصغر',
            sort_size_desc: 'الحجم من الأكبر',
            filter_platform: 'النظام',
            filter_category: 'التصنيف',
            filter_price: 'السعر',
            filter_size: 'الحجم',
            filter_download_type: 'نوع التحميل',
            filter_status: 'الحالة',
            filter_type: 'النوع',
            free: 'مجاني',
            paid: 'مدفوع',
            lt50: 'أقل من 50 MB',
            '50-100': '50-100 MB',
            '100-500': '100-500 MB',
            '500-1024': '500 MB-1 GB',
            gt1024: 'أكثر من 1 GB',
            single: 'ملف واحد',
            multipart: 'متعدد الأجزاء',
            new: 'جديد',
            updated: 'محدّث',
            popular: 'شائع',
            featured: 'مميز',
            favorites_only: 'المفضلة فقط',
            load_more: 'عرض المزيد',
            showing_results: 'عرض {count} من أصل {total} نتيجة',
            no_results_title: 'لا توجد نتائج',
            no_results_desc: 'جرّب تغيير كلمات البحث أو إزالة بعض الفلاتر.',
            details: 'تفاصيل',
            download: 'تحميل',
            favorite_add: 'أضف للمفضلة',
            favorite_remove: 'إزالة من المفضلة',
            share: 'مشاركة',
            copy_link: 'نسخ الرابط',
            link_copied: 'تم نسخ الرابط',
            download_started: 'بدأ التحميل',
            invalid_url: 'رابط غير صالح',
            added_fav: 'تمت الإضافة للمفضلة',
            removed_fav: 'تمت الإزالة من المفضلة',
            filters_reset: 'تمت إعادة تعيين الفلاتر',
            download_selected: 'تحميل المحدد',
            clear_selection: 'إلغاء التحديد',
            download_all_parts: 'تحميل جميع الأجزاء',
            select_all_parts: 'تحديد الكل',
            clear_parts: 'إلغاء التحديد',
            download_selected_parts: 'تحميل المحدد',
            total_size: 'الحجم الإجمالي',
            parts: 'جزء',
            extract_note: 'حمّل جميع الأجزاء وضعها في مجلد واحد، ثم ابدأ فك الضغط من الجزء الأول.',
            optional_files: 'ملفات اختيارية',
            version_label: 'الإصدار',
            requirements_label: 'المتطلبات',
            size_label: 'الحجم',
            category_label: 'التصنيف',
            platform_label: 'النظام',
            type_label: 'النوع',
            downloads_label: 'التحميلات',
            updated_label: 'آخر تحديث',
            status_label: 'الحالة',
            keywords_label: 'كلمات مفتاحية',
            favorites_empty_title: 'لا توجد مفضلة بعد',
            favorites_empty_desc: 'اضغط على أيقونة القلب لحفظ العناصر هنا.',
            footer_desc: 'مكتبة رقمية احترافية لتحميل البرامج والتطبيقات والكتب والأدوات.',
            footer_categories: 'التصنيفات',
            footer_links: 'روابط مهمة',
            footer_about: 'من نحن',
            footer_contact: 'اتصل بنا',
            footer_privacy: 'سياسة الخصوصية',
            footer_terms: 'الشروط والأحكام',
            footer_social: 'تابعنا',
            footer_copyright: '© 2026 عوض تك. جميع الحقوق محفوظة.',
            // Admin Modal
            admin_title_add: 'إضافة عنصر جديد',
            admin_title_edit: 'تعديل العنصر',
            admin_general_tab: 'معلومات أساسية',
            admin_media_tab: 'الصورة',
            admin_download_tab: 'روابط التحميل',
            admin_parts_tab: 'الأجزاء',
            admin_servers_tab: 'السيرفرات',
            admin_seo_tab: 'SEO',
            admin_publish_tab: 'النشر',
            admin_title_label: 'العنوان بالعربية',
            admin_title_en_label: 'العنوان بالإنجليزية',
            admin_desc_label: 'الوصف بالعربية',
            admin_desc_en_label: 'الوصف بالإنجليزية',
            admin_type_label: 'النوع',
            admin_platform_label: 'المنصة',
            admin_category_label: 'التصنيف',
            admin_status_label: 'الحالة',
            admin_version_label: 'الإصدار',
            admin_size_label: 'الحجم',
            admin_requirements_label: 'المتطلبات',
            admin_updated_label: 'تاريخ التحديث',
            admin_downloads_label: 'عدد التحميلات',
            admin_image_label: 'رابط الصورة',
            admin_image_fit_label: 'طريقة عرض الصورة',
            admin_image_fit_cover: 'تغطية',
            admin_image_fit_contain: 'احتواء',
            admin_download_type_label: 'نوع التحميل',
            admin_single_file: 'ملف واحد',
            admin_multi_part: 'متعدد الأجزاء',
            admin_download_url_label: 'رابط التحميل المباشر',
            admin_add_server: 'إضافة سيرفر',
            admin_server_name_label: 'اسم السيرفر',
            admin_server_url_label: 'رابط السيرفر',
            admin_add_part: 'إضافة جزء',
            admin_part_name_label: 'اسم الجزء',
            admin_part_filename_label: 'اسم الملف',
            admin_part_size_label: 'حجم الجزء',
            admin_part_url_label: 'رابط الجزء',
            admin_seo_title_label: 'SEO Title',
            admin_seo_desc_label: 'SEO Description',
            admin_slug_label: 'Slug',
            admin_featured_label: 'مميز',
            admin_popular_label: 'رائج',
            admin_save: 'حفظ',
            admin_cancel: 'إلغاء',
            admin_preview: 'معاينة',
            admin_delete_confirm_title: 'تأكيد الحذف',
            admin_delete_confirm_text: 'هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع.',
            admin_confirm_yes: 'نعم، احذف',
            admin_confirm_no: 'إلغاء',
            comments_title: 'التعليقات',
            comments_count: '{count} تعليقات',
            comments_leave: 'اترك تعليقًا',
            comments_name: 'الاسم',
            comments_email: 'البريد (اختياري)',
            comments_comment: 'التعليق',
            comments_submit: 'إرسال',
            comments_reply: 'رد',
            comments_like: 'أعجبني',
            comments_report: 'إبلاغ',
            comments_delete: 'حذف',
            comments_hide: 'إخفاء',
            comments_approve: 'موافقة',
            comments_load_more: 'تحميل المزيد',
            comments_no_comments: 'لا توجد تعليقات بعد.',
            comments_reply_placeholder: 'اكتب ردًا...',
            share_success: 'تمت المشاركة',
            copy_link_success: 'تم نسخ الرابط',
            error_loading: 'تعذر تحميل البيانات. حاول مجددًا.',
            retry: 'إعادة المحاولة',
            no_download_links: 'لا توجد روابط تحميل متاحة.',
            report_broken: 'إبلاغ عن رابط معطل',
            report_content: 'إبلاغ عن محتوى',
            related_items: 'عناصر ذات صلة',
            file_info: 'معلومات الملف',
            file_name: 'اسم الملف',
            file_format: 'الصيغة',
            file_arch: 'المعمارية',
            publisher: 'الناشر',
            license: 'الترخيص',
            official_website: 'الموقع الرسمي',
            version_history: 'سجل الإصدارات',
            changelog: 'سجل التغييرات',
            screenshots: 'لقطات شاشة',
            user_rating: 'تقييم المستخدمين',
            average_rating: 'التقييم',
            total_ratings: 'تقييمات',
            admin_duplicate: 'تكرار',
            admin_edit: 'تعديل',
            admin_delete: 'حذف',
            admin_feature: 'تمييز',
            admin_unfeature: 'إلغاء التمييز',
            admin_mark_popular: 'تعليم كرائج',
            admin_unmark_popular: 'إلغاء الرائج',
            admin_manage: 'إدارة',
            admin_mode: 'وضع المسؤول التجريبي',
            admin_login: 'دخول كمسؤول',
            admin_logout: 'خروج',
            language_name: 'العربية',
            theme_dark: 'داكن',
            theme_light: 'فاتح',
            // إضافات من الصفحة المقدمة
            upload_center: 'مركز الرفع',
            upload_image: 'رفع صورة',
            upload_loading: 'جارٍ تحميل واجهة الرفع...',
            save_publish: 'حفظ ونشر',
            new_topic: 'إضافة موضوع',
            update_topic: 'تحديث موضوع',
            search_topic: 'ابحث عن الموضوع المطلوب تحديثه أو إضافة جزء له:',
            all_sections: 'كل الأقسام',
            topic_title: 'عنوان الموضوع',
            file_size: 'حجم الملف (اختياري)',
            os_requirements: 'متطلبات التشغيل (اختياري)',
            cover_url: 'رابط الغلاف',
            download_links: 'روابط التحميل (كل رابط في سطر)',
            activation_key: 'مفتاح التفعيل (اتركه فارغاً إذا لم يوجد)',
            description: 'الوصف',
            links_format: 'شكل الروابط',
            versions: 'إصدارات (أحدث/أقدم)',
            parts: 'أجزاء مقسمة تلقائياً',
            category: 'القسم',
            delete_confirm_title: 'تأكيد الحذف',
            delete_confirm_text: 'هل أنت متأكد من حذف هذا الموضوع؟ لا يمكن التراجع عن هذا الإجراء وسيتم مسحه نهائياً.',
            delete_yes: 'حذف نعم',
            delete_cancel: 'إلغاء'
        },
        en: {
            app_name: 'Awad Tech',
            app_name_en: 'عوض تك',
            nav_home: 'Home',
            nav_categories: 'Categories',
            nav_featured: 'Featured',
            nav_library: 'Library',
            nav_popular: 'Most Downloaded',
            nav_favorites: 'Favorites',
            hero_title: 'Digital Software & Apps Library',
            hero_subtitle: 'Download the latest Windows programs, Android & iOS apps, ebooks, and tools safely and fast.',
            search_placeholder: 'Search for a program, app, book...',
            search_btn: 'Search',
            stats_programs: 'Programs',
            stats_apps: 'Apps',
            stats_books: 'Books',
            stats_files: 'Files',
            categories_title: 'Categories',
            featured_title: 'Featured',
            library_title: 'Library',
            popular_title: 'Most Downloaded',
            latest_title: 'Latest Additions',
            favorites_title: 'Favorites',
            recently_viewed: 'Recently Viewed',
            admin_panel: 'Admin Panel',
            add_new_item: 'Add New Item',
            filter_toggle: 'Filters',
            reset_filters: 'Reset',
            sort_label: 'Sort:',
            sort_latest: 'Latest',
            sort_oldest: 'Oldest',
            sort_downloads: 'Most Downloaded',
            sort_popular: 'Most Popular',
            sort_name_asc: 'Name A-Z',
            sort_name_desc: 'Name Z-A',
            sort_size_asc: 'Size Smallest',
            sort_size_desc: 'Size Largest',
            filter_platform: 'Platform',
            filter_category: 'Category',
            filter_price: 'Price',
            filter_size: 'Size',
            filter_download_type: 'Download Type',
            filter_status: 'Status',
            filter_type: 'Type',
            free: 'Free',
            paid: 'Paid',
            lt50: 'Under 50 MB',
            '50-100': '50-100 MB',
            '100-500': '100-500 MB',
            '500-1024': '500 MB-1 GB',
            gt1024: 'Over 1 GB',
            single: 'Single File',
            multipart: 'Multi-Part',
            new: 'New',
            updated: 'Updated',
            popular: 'Popular',
            featured: 'Featured',
            favorites_only: 'Favorites only',
            load_more: 'Load More',
            showing_results: 'Showing {count} of {total} results',
            no_results_title: 'No results found',
            no_results_desc: 'Try changing search words or removing some filters.',
            details: 'Details',
            download: 'Download',
            favorite_add: 'Add to Favorites',
            favorite_remove: 'Remove from Favorites',
            share: 'Share',
            copy_link: 'Copy Link',
            link_copied: 'Link copied',
            download_started: 'Download started',
            invalid_url: 'Invalid URL',
            added_fav: 'Added to Favorites',
            removed_fav: 'Removed from Favorites',
            filters_reset: 'Filters reset',
            download_selected: 'Download Selected',
            clear_selection: 'Clear Selection',
            download_all_parts: 'Download All Parts',
            select_all_parts: 'Select All',
            clear_parts: 'Clear',
            download_selected_parts: 'Download Selected Parts',
            total_size: 'Total Size',
            parts: 'Parts',
            extract_note: 'Download all parts and place them in the same folder before extracting Part 1.',
            optional_files: 'Optional Files',
            version_label: 'Version',
            requirements_label: 'Requirements',
            size_label: 'Size',
            category_label: 'Category',
            platform_label: 'Platform',
            type_label: 'Type',
            downloads_label: 'Downloads',
            updated_label: 'Updated',
            status_label: 'Status',
            keywords_label: 'Keywords',
            favorites_empty_title: 'No favorites yet',
            favorites_empty_desc: 'Click the heart icon to save items here.',
            footer_desc: 'Professional digital library for downloading software, apps, books, and tools.',
            footer_categories: 'Categories',
            footer_links: 'Important Links',
            footer_about: 'About',
            footer_contact: 'Contact',
            footer_privacy: 'Privacy Policy',
            footer_terms: 'Terms & Conditions',
            footer_social: 'Follow Us',
            footer_copyright: '© 2026 Awad Tech. All rights reserved.',
            admin_title_add: 'Add New Item',
            admin_title_edit: 'Edit Item',
            admin_general_tab: 'General',
            admin_media_tab: 'Media',
            admin_download_tab: 'Download',
            admin_parts_tab: 'Parts',
            admin_servers_tab: 'Servers',
            admin_seo_tab: 'SEO',
            admin_publish_tab: 'Publishing',
            admin_title_label: 'Arabic Title',
            admin_title_en_label: 'English Title',
            admin_desc_label: 'Arabic Description',
            admin_desc_en_label: 'English Description',
            admin_type_label: 'Type',
            admin_platform_label: 'Platform',
            admin_category_label: 'Category',
            admin_status_label: 'Status',
            admin_version_label: 'Version',
            admin_size_label: 'Size',
            admin_requirements_label: 'Requirements',
            admin_updated_label: 'Update Date',
            admin_downloads_label: 'Downloads Count',
            admin_image_label: 'Image URL',
            admin_image_fit_label: 'Image Fit',
            admin_image_fit_cover: 'Cover',
            admin_image_fit_contain: 'Contain',
            admin_download_type_label: 'Download Type',
            admin_single_file: 'Single File',
            admin_multi_part: 'Multi-Part',
            admin_download_url_label: 'Direct Download URL',
            admin_add_server: 'Add Server',
            admin_server_name_label: 'Server Name',
            admin_server_url_label: 'Server URL',
            admin_add_part: 'Add Part',
            admin_part_name_label: 'Part Name',
            admin_part_filename_label: 'Filename',
            admin_part_size_label: 'Part Size',
            admin_part_url_label: 'Part URL',
            admin_seo_title_label: 'SEO Title',
            admin_seo_desc_label: 'SEO Description',
            admin_slug_label: 'Slug',
            admin_featured_label: 'Featured',
            admin_popular_label: 'Popular',
            admin_save: 'Save',
            admin_cancel: 'Cancel',
            admin_preview: 'Preview',
            admin_delete_confirm_title: 'Confirm Deletion',
            admin_delete_confirm_text: 'Are you sure you want to delete this item? This cannot be undone.',
            admin_confirm_yes: 'Yes, Delete',
            admin_confirm_no: 'Cancel',
            comments_title: 'Comments',
            comments_count: '{count} Comments',
            comments_leave: 'Leave a Comment',
            comments_name: 'Name',
            comments_email: 'Email (optional)',
            comments_comment: 'Comment',
            comments_submit: 'Submit',
            comments_reply: 'Reply',
            comments_like: 'Like',
            comments_report: 'Report',
            comments_delete: 'Delete',
            comments_hide: 'Hide',
            comments_approve: 'Approve',
            comments_load_more: 'Load More',
            comments_no_comments: 'No comments yet.',
            comments_reply_placeholder: 'Write a reply...',
            share_success: 'Shared successfully',
            copy_link_success: 'Link copied',
            error_loading: 'Failed to load data. Please try again.',
            retry: 'Retry',
            no_download_links: 'No download links available.',
            report_broken: 'Report Broken Link',
            report_content: 'Report Content',
            related_items: 'Related Items',
            file_info: 'File Information',
            file_name: 'File Name',
            file_format: 'Format',
            file_arch: 'Architecture',
            publisher: 'Publisher',
            license: 'License',
            official_website: 'Official Website',
            version_history: 'Version History',
            changelog: 'Changelog',
            screenshots: 'Screenshots',
            user_rating: 'User Rating',
            average_rating: 'Rating',
            total_ratings: 'Ratings',
            admin_duplicate: 'Duplicate',
            admin_edit: 'Edit',
            admin_delete: 'Delete',
            admin_feature: 'Feature',
            admin_unfeature: 'Unfeature',
            admin_mark_popular: 'Mark Popular',
            admin_unmark_popular: 'Unmark Popular',
            admin_manage: 'Manage',
            admin_mode: 'Demo Admin Mode',
            admin_login: 'Login as Admin',
            admin_logout: 'Logout',
            language_name: 'English',
            theme_dark: 'Dark',
            theme_light: 'Light',
            upload_center: 'Upload Center',
            upload_image: 'Upload Image',
            upload_loading: 'Loading upload interface...',
            save_publish: 'Save & Publish',
            new_topic: 'Add Topic',
            update_topic: 'Update Topic',
            search_topic: 'Search for the topic to update or add parts:',
            all_sections: 'All Sections',
            topic_title: 'Topic Title',
            file_size: 'File Size (optional)',
            os_requirements: 'OS Requirements (optional)',
            cover_url: 'Cover URL',
            download_links: 'Download Links (one per line)',
            activation_key: 'Activation Key (leave empty if none)',
            description: 'Description',
            links_format: 'Links Format',
            versions: 'Versions (latest/older)',
            parts: 'Auto split parts',
            category: 'Category',
            delete_confirm_title: 'Confirm Deletion',
            delete_confirm_text: 'Are you sure you want to delete this topic? This cannot be undone.',
            delete_yes: 'Yes, Delete',
            delete_cancel: 'Cancel'
        }
    };

    // ===== أيقونات المنصات والتصنيفات =====
    const platformKeys = ['Windows', 'Android', 'iOS', 'PDF', 'Other'];
    const allCategories = [
        { key: 'Windows', icon: 'fa-brands fa-windows' },
        { key: 'Android', icon: 'fa-brands fa-android' },
        { key: 'iOS', icon: 'fa-brands fa-apple' },
        { key: 'Books', icon: 'fa-solid fa-book' },
        { key: 'Tools', icon: 'fa-solid fa-toolbox' },
        { key: 'Office', icon: 'fa-solid fa-file-word' },
        { key: 'Multimedia', icon: 'fa-solid fa-photo-film' },
        { key: 'Graphics', icon: 'fa-solid fa-palette' },
        { key: 'Security', icon: 'fa-solid fa-shield-halved' },
        { key: 'Internet', icon: 'fa-solid fa-globe' },
        { key: 'Education', icon: 'fa-solid fa-graduation-cap' },
        { key: 'Development', icon: 'fa-solid fa-code' }
    ];

    // ===== دوال مساعدة =====
    function t(key) { return translations[currentLang][key] || translations.en[key] || key; }
    function getTitle(p) { return currentLang === 'ar' ? (p.rawTitle || p.titleEn || p.title) : (p.titleEn || p.rawTitle || p.title); }
    function getDesc(p) { return currentLang === 'ar' ? (p.parsedData?.desc || p.description) : (p.descriptionEn || p.parsedData?.desc || p.description); }
    function getCatLabel(key) {
        const map = {
            ar: { Windows:'ويندوز', Android:'أندرويد', iOS:'آيفون', Books:'كتب', Tools:'أدوات', Office:'أوفيس', Multimedia:'وسائط', Graphics:'تصميم', Security:'حماية', Internet:'إنترنت', Education:'تعليم', Development:'تطوير' },
            en: { Windows:'Windows', Android:'Android', iOS:'iOS', Books:'Books', Tools:'Tools', Office:'Office', Multimedia:'Multimedia', Graphics:'Graphics', Security:'Security', Internet:'Internet', Education:'Education', Development:'Development' }
        };
        return map[currentLang][key] || key;
    }
    function formatNum(num) {
        if (num >= 1000000) return (num/1000000).toFixed(1)+'M';
        if (num >= 1000) return (num/1000).toFixed(1)+'K';
        return num;
    }
    function formatDate(dateStr) {
        const d = new Date(dateStr);
        if (isNaN(d)) return '—';
        return new Intl.DateTimeFormat(currentLang === 'ar' ? 'ar' : 'en', { year:'numeric', month:'short', day:'numeric' }).format(d);
    }
    function parseSizeToMB(size) {
        const m = String(size).match(/([\d.]+)\s*(KB|MB|GB|TB)/i);
        if (!m) return 0;
        let v = parseFloat(m[1]);
        switch(m[2].toUpperCase()) {
            case 'KB': return v/1024;
            case 'MB': return v;
            case 'GB': return v*1024;
            case 'TB': return v*1024*1024;
        }
        return 0;
    }
    function formatMB(mb) {
        if (mb >= 1024) return (mb/1024).toFixed(2)+' GB';
        return Math.round(mb)+' MB';
    }
    function isWithinDays(dateStr, days) {
        const d = new Date(dateStr);
        const diff = (new Date() - d) / (1000*60*60*24);
        return diff >= 0 && diff <= days;
    }
    function sortedParts(item) { return [...(item.parts || [])].sort((a,b)=>(a.id||0)-(b.id||0)); }
    function getTotalSize(item) {
        if (item.downloadType === 'multipart' && item.parts?.length) {
            const total = item.parts.reduce((sum,p) => sum + parseSizeToMB(p.size), 0);
            return formatMB(total);
        }
        return item.size;
    }
    function getBadges(item) {
        const badges = [];
        if (isWithinDays(item.createdAt, 30)) badges.push({text:t('new'), cls:'awad-badge-success', icon:'fa-solid fa-bolt'});
        if (isWithinDays(item.updated, 30)) badges.push({text:t('updated'), cls:'awad-badge-primary', icon:'fa-solid fa-clock'});
        if (item.featured) badges.push({text:t('featured'), cls:'awad-badge-warning', icon:'fa-solid fa-star'});
        if (item.popular) badges.push({text:t('popular'), cls:'awad-badge-danger', icon:'fa-solid fa-fire'});
        if (item.downloadType === 'multipart') badges.push({text:t('multipart'), cls:'awad-badge-primary', icon:'fa-solid fa-layer-group'});
        badges.push({text: item.status, cls: item.status === 'Free' ? 'awad-badge-success' : 'awad-badge-danger', icon: item.status === 'Free' ? 'fa-solid fa-check' : 'fa-solid fa-lock'});
        return badges.slice(0,4);
    }
    function safeUrl(url) {
        if (!url) return '';
        const trimmed = String(url).trim();
        return /^https?:\/\//i.test(trimmed) ? trimmed : '';
    }
    function openSafe(url) {
        const safe = safeUrl(url);
        if (!safe) { showToast(t('invalid_url'), 'error'); return false; }
        window.open(safe, '_blank', 'noopener,noreferrer');
        return true;
    }
    function showToast(msg, type = 'info') {
        const container = document.getElementById('awad-toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'awad-toast';
        const icon = document.createElement('i');
        switch(type) {
            case 'success': icon.className = 'fa-solid fa-circle-check'; break;
            case 'error': icon.className = 'fa-solid fa-circle-exclamation'; break;
            case 'warning': icon.className = 'fa-solid fa-triangle-exclamation'; break;
            default: icon.className = 'fa-solid fa-circle-info';
        }
        toast.appendChild(icon);
        toast.appendChild(document.createTextNode(msg));
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('awad-show'));
        setTimeout(() => {
            toast.classList.remove('awad-show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
    async function copyText(text) {
        try { await navigator.clipboard.writeText(text); return true; }
        catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position='fixed'; ta.style.opacity='0';
            document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); ta.remove();
            return true;
        }
    }
    function getPlatformIcon(platform) {
        switch(platform) {
            case 'Windows': return 'fa-brands fa-windows';
            case 'Android': return 'fa-brands fa-android';
            case 'iOS': return 'fa-brands fa-apple';
            case 'PDF': return 'fa-solid fa-file-pdf';
            default: return 'fa-solid fa-file';
        }
    }

    // ===== إنشاء البطاقات =====
    function createCard(topicData) {
        const { rawTitle, parsedData, topicUrl, editBtn, delBtn, topicId } = topicData;
        const card = document.createElement('article');
        card.className = 'awad-card';
        card.dataset.id = topicId;

        const media = document.createElement('div');
        media.className = 'awad-card-media';
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = rawTitle;
        img.src = safeUrl(parsedData.img) || 'https://picsum.photos/seed/fallback/600/400';
        img.onerror = () => { img.src = 'https://picsum.photos/seed/fallback/600/400'; };
        media.appendChild(img);

        const badges = document.createElement('div');
        badges.className = 'awad-badges';
        getBadges(parsedData).forEach(b => {
            const span = document.createElement('span');
            span.className = `awad-badge ${b.cls}`;
            span.innerHTML = `<i class="${b.icon}"></i> ${b.text}`;
            badges.appendChild(span);
        });
        media.appendChild(badges);

        const checkWrap = document.createElement('label');
        checkWrap.className = 'awad-checkbox-wrapper';
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'awad-select-check';
        check.dataset.id = topicId;
        check.checked = state.selected.has(topicId);
        checkWrap.appendChild(check);
        const checkmark = document.createElement('span');
        checkmark.className = 'awad-checkmark';
        checkWrap.appendChild(checkmark);
        media.appendChild(checkWrap);

        const favBtn = document.createElement('button');
        favBtn.className = 'awad-fav-btn';
        favBtn.dataset.action = 'favorite';
        favBtn.dataset.id = topicId;
        favBtn.classList.toggle('awad-active', state.favorites.has(topicId));
        favBtn.innerHTML = `<i class="fa-${state.favorites.has(topicId) ? 'solid' : 'regular'} fa-heart"></i>`;
        media.appendChild(favBtn);

        card.appendChild(media);

        const body = document.createElement('div');
        body.className = 'awad-card-body';
        const title = document.createElement('h3');
        title.className = 'awad-card-title';
        title.textContent = rawTitle;
        body.appendChild(title);
        const desc = document.createElement('p');
        desc.className = 'awad-card-desc';
        desc.textContent = parsedData.desc || 'لا يوجد وصف';
        body.appendChild(desc);
        const meta = document.createElement('div');
        meta.className = 'awad-card-meta';
        const platformTag = document.createElement('span');
        platformTag.className = 'awad-platform-tag';
        platformTag.innerHTML = `<i class="${getPlatformIcon(parsedData.platform)}"></i> ${parsedData.platform || 'غير محدد'}`;
        meta.appendChild(platformTag);
        if (parsedData.size) meta.appendChild(Object.assign(document.createElement('span'), {textContent: `📦 ${parsedData.size}`}));
        if (parsedData.version) meta.appendChild(Object.assign(document.createElement('span'), {textContent: `v${parsedData.version}`}));
        meta.appendChild(Object.assign(document.createElement('span'), {textContent: `⬇ ${formatNum(parsedData.downloads || 0)}`}));
        body.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'awad-card-actions';
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'awad-btn awad-btn-secondary awad-btn-sm';
        detailsBtn.dataset.action = 'details';
        detailsBtn.dataset.id = topicId;
        detailsBtn.innerHTML = '<i class="fa-solid fa-circle-info"></i> ' + t('details');
        actions.appendChild(detailsBtn);
        const dlBtn = document.createElement('button');
        dlBtn.className = 'awad-btn awad-btn-primary awad-btn-sm';
        dlBtn.dataset.action = 'download';
        dlBtn.dataset.id = topicId;
        dlBtn.innerHTML = '<i class="fa-solid fa-download"></i> ' + t('download');
        actions.appendChild(dlBtn);
        body.appendChild(actions);

        // أزرار الإدارة
        if (isAdmin && (editBtn || delBtn)) {
            const adminBox = document.createElement('div');
            adminBox.className = 'awad-admin-box';
            if (editBtn) {
                const editLink = document.createElement('button');
                editLink.className = 'awad-btn awad-btn-ghost awad-btn-sm';
                editLink.innerHTML = '<i class="fa-solid fa-pen"></i> ' + t('admin_edit');
                editLink.addEventListener('click', (e) => {
                    e.stopPropagation();
                    editDlItem(editBtn);
                });
                adminBox.appendChild(editLink);
            }
            if (delBtn) {
                const delLink = document.createElement('button');
                delLink.className = 'awad-btn awad-btn-ghost awad-btn-sm';
                delLink.innerHTML = '<i class="fa-solid fa-trash"></i> ' + t('admin_delete');
                delLink.addEventListener('click', (e) => {
                    e.stopPropagation();
                    confirmDelete(delBtn);
                });
                adminBox.appendChild(delLink);
            }
            body.appendChild(adminBox);
        }

        card.appendChild(body);
        return card;
    }

    function createMiniCard(topicData) {
        const card = document.createElement('article');
        card.className = 'awad-mini-card';
        card.dataset.action = 'details';
        card.dataset.id = topicData.topicId;
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = topicData.rawTitle;
        img.src = safeUrl(topicData.parsedData.img) || 'https://picsum.photos/seed/fallback/600/400';
        card.appendChild(img);
        const body = document.createElement('div');
        body.className = 'awad-mini-body';
        const title = document.createElement('strong');
        title.className = 'awad-mini-title';
        title.textContent = topicData.rawTitle;
        body.appendChild(title);
        const platform = document.createElement('span');
        platform.className = 'awad-mini-platform';
        platform.textContent = topicData.parsedData.platform || '';
        body.appendChild(platform);
        card.appendChild(body);
        return card;
    }

    function renderSkeletons(grid, count) {
        grid.innerHTML = '';
        const frag = document.createDocumentFragment();
        for (let i=0; i<count; i++) {
            const card = document.createElement('div');
            card.className = 'awad-card awad-skeleton-card';
            const media = document.createElement('div');
            media.className = 'awad-skeleton-block awad-skeleton-media';
            card.appendChild(media);
            const body = document.createElement('div');
            body.className = 'awad-skeleton-body';
            body.appendChild(Object.assign(document.createElement('div'), {className:'awad-skeleton-block awad-skeleton-line'}));
            body.appendChild(Object.assign(document.createElement('div'), {className:'awad-skeleton-block awad-skeleton-line short'}));
            body.appendChild(Object.assign(document.createElement('div'), {className:'awad-skeleton-block awad-skeleton-line medium'}));
            card.appendChild(body);
            frag.appendChild(card);
        }
        grid.appendChild(frag);
    }

    // ===== عرض الأقسام =====
    function renderCategories() {
        const grid = document.getElementById('awad-categories-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const frag = document.createDocumentFragment();
        allCategories.forEach(cat => {
            const isPlatform = platformKeys.includes(cat.key);
            const count = state.allTopicsData.filter(t => isPlatform ? t.parsedData.platform === cat.key : t.parsedData.category === cat.key).length;
            const btn = document.createElement('button');
            btn.className = 'awad-cat-card';
            btn.dataset.category = cat.key;
            const icon = document.createElement('i');
            icon.className = cat.icon + ' awad-cat-icon';
            btn.appendChild(icon);
            const name = document.createElement('span');
            name.className = 'awad-cat-name';
            name.textContent = getCatLabel(cat.key);
            btn.appendChild(name);
            const countSpan = document.createElement('span');
            countSpan.className = 'awad-cat-count';
            countSpan.textContent = count;
            btn.appendChild(countSpan);
            frag.appendChild(btn);
        });
        grid.appendChild(frag);
    }

    function renderStats() {
        document.getElementById('awad-stat-programs').textContent = state.allTopicsData.filter(t => t.parsedData.type === 'software').length;
        document.getElementById('awad-stat-apps').textContent = state.allTopicsData.filter(t => t.parsedData.type === 'app').length;
        document.getElementById('awad-stat-books').textContent = state.allTopicsData.filter(t => t.parsedData.type === 'ebook').length;
        document.getElementById('awad-stat-files').textContent = state.allTopicsData.length;
    }

    function renderFeatured() {
        const grid = document.getElementById('awad-featured-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const featured = state.allTopicsData.filter(t => t.parsedData.featured);
        if (!featured.length) return;
        const frag = document.createDocumentFragment();
        featured.forEach(t => frag.appendChild(createCard(t)));
        grid.appendChild(frag);
    }

    function renderPopular() {
        const grid = document.getElementById('awad-popular-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const popular = [...state.allTopicsData].sort((a,b) => (b.parsedData.downloads||0) - (a.parsedData.downloads||0)).slice(0,4);
        const frag = document.createDocumentFragment();
        popular.forEach(t => frag.appendChild(createCard(t)));
        grid.appendChild(frag);
    }

    function renderLatest() {
        const grid = document.getElementById('awad-latest-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const latest = [...state.allTopicsData].sort((a,b) => new Date(b.parsedData.updated) - new Date(a.parsedData.updated)).slice(0,4);
        const frag = document.createDocumentFragment();
        latest.forEach(t => frag.appendChild(createCard(t)));
        grid.appendChild(frag);
    }

    function renderFavorites() {
        const grid = document.getElementById('awad-favorites-grid');
        const empty = document.getElementById('awad-favorites-empty');
        if (!grid || !empty) return;
        grid.innerHTML = '';
        const favTopics = state.allTopicsData.filter(t => state.favorites.has(t.topicId));
        empty.hidden = favTopics.length !== 0;
        if (favTopics.length) {
            const frag = document.createDocumentFragment();
            favTopics.forEach(t => frag.appendChild(createCard(t)));
            grid.appendChild(frag);
        }
        document.getElementById('awad-fav-count').textContent = state.favorites.size;
    }

    function renderRecent() {
        const grid = document.getElementById('awad-recent-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const recentTopics = state.recentlyViewed
            .map(id => state.allTopicsData.find(t => t.topicId === id))
            .filter(Boolean);
        if (!recentTopics.length) return;
        const frag = document.createDocumentFragment();
        recentTopics.forEach(t => frag.appendChild(createMiniCard(t)));
        grid.appendChild(frag);
    }

    function renderFilterPanel() {
        const panel = document.getElementById('awad-filter-panel');
        if (!panel) return;
        panel.innerHTML = '';
        const groups = [
            { key:'platform', label:t('filter_platform'), options: platformKeys.map(v=>({value:v,label:getCatLabel(v)})) },
            { key:'category', label:t('filter_category'), options: ['Office','Multimedia','Graphics','Internet','Security','Education','Tools','Development','Books'].map(v=>({value:v,label:getCatLabel(v)})) },
            { key:'type', label:t('filter_type'), options: ['Software','App','Book','Tool'].map(v=>({value:v,label:getCatLabel(v)})) },
            { key:'price', label:t('filter_price'), options: [{value:'Free',label:t('free')},{value:'Paid',label:t('paid')}] },
            { key:'size', label:t('filter_size'), options: [{value:'lt50',label:t('lt50')},{value:'50-100',label:t('50-100')},{value:'100-500',label:t('100-500')},{value:'500-1024',label:t('500-1024')},{value:'gt1024',label:t('gt1024')}] },
            { key:'downloadType', label:t('filter_download_type'), options: [{value:'single',label:t('single')},{value:'multipart',label:t('multipart')}] },
            { key:'status', label:t('filter_status'), options: [{value:'new',label:t('new')},{value:'updated',label:t('updated')},{value:'popular',label:t('popular')},{value:'featured',label:t('featured')}] }
        ];
        const frag = document.createDocumentFragment();
        groups.forEach(group => {
            const div = document.createElement('div');
            div.className = 'awad-filter-group';
            const h4 = document.createElement('h4');
            h4.textContent = group.label;
            div.appendChild(h4);
            const opts = document.createElement('div');
            opts.className = 'awad-filter-options';
            group.options.forEach(opt => {
                const label = document.createElement('label');
                label.className = 'awad-filter-chip';
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.dataset.filterType = group.key;
                input.dataset.filterValue = opt.value;
                input.checked = state.filters[group.key]?.includes(opt.value) || false;
                label.appendChild(input);
                const span = document.createElement('span');
                span.textContent = opt.label;
                label.appendChild(span);
                opts.appendChild(label);
            });
            div.appendChild(opts);
            frag.appendChild(div);
        });
        const favDiv = document.createElement('div');
        favDiv.className = 'awad-filter-group';
        const h4 = document.createElement('h4');
        h4.textContent = t('favorites_title');
        favDiv.appendChild(h4);
        const label = document.createElement('label');
        label.className = 'awad-filter-chip';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.dataset.filterType = 'favoritesOnly';
        input.checked = state.filters.favoritesOnly;
        label.appendChild(input);
        const span = document.createElement('span');
        span.textContent = t('favorites_only');
        label.appendChild(span);
        favDiv.appendChild(label);
        frag.appendChild(favDiv);
        panel.appendChild(frag);
    }

    // ===== الفلاتر والفرز =====
    function matchesSizeFilter(key, sizeStr) {
        const mb = parseSizeToMB(sizeStr);
        switch(key) {
            case 'lt50': return mb < 50;
            case '50-100': return mb >= 50 && mb <= 100;
            case '100-500': return mb > 100 && mb <= 500;
            case '500-1024': return mb > 500 && mb <= 1024;
            case 'gt1024': return mb > 1024;
            default: return true;
        }
    }
    function matchesStatusFilter(key, item) {
        const isNew = isWithinDays(item.createdAt, 30);
        const isUpdated = isWithinDays(item.updated, 30);
        switch(key) {
            case 'new': return isNew;
            case 'updated': return isUpdated;
            case 'popular': return !!item.popular;
            case 'featured': return !!item.featured;
            default: return true;
        }
    }

    function getFilteredSortedTopics() {
        let list = [...state.allTopicsData];
        if (state.query) {
            const q = state.query.toLowerCase();
            list = list.filter(t =>
                (t.rawTitle?.toLowerCase().includes(q)) ||
                (t.parsedData.desc?.toLowerCase().includes(q)) ||
                (t.parsedData.keywords || []).some(k => k.toLowerCase().includes(q)) ||
                (t.parsedData.platform?.toLowerCase().includes(q)) ||
                (t.parsedData.type?.toLowerCase().includes(q)) ||
                (t.parsedData.version?.toLowerCase().includes(q))
            );
        }
        if (state.filters.favoritesOnly) list = list.filter(t => state.favorites.has(t.topicId));
        if (state.filters.platform.length) list = list.filter(t => state.filters.platform.includes(t.parsedData.platform));
        if (state.filters.category.length) list = list.filter(t => state.filters.category.includes(t.parsedData.category));
        if (state.filters.type.length) list = list.filter(t => state.filters.type.includes(t.parsedData.type));
        if (state.filters.price.length) list = list.filter(t => state.filters.price.includes(t.parsedData.status));
        if (state.filters.downloadType.length) list = list.filter(t => state.filters.downloadType.includes(t.parsedData.downloadType));
        if (state.filters.size.length) list = list.filter(t => state.filters.size.some(s => matchesSizeFilter(s, t.parsedData.size)));
        if (state.filters.status.length) list = list.filter(t => state.filters.status.some(s => matchesStatusFilter(s, t.parsedData)));

        switch(state.sort) {
            case 'latest': list.sort((a,b) => new Date(b.parsedData.updated) - new Date(a.parsedData.updated)); break;
            case 'oldest': list.sort((a,b) => new Date(a.parsedData.updated) - new Date(b.parsedData.updated)); break;
            case 'downloads': list.sort((a,b) => (b.parsedData.downloads||0) - (a.parsedData.downloads||0)); break;
            case 'popular': list.sort((a,b) => (b.parsedData.popular?1:0) - (a.parsedData.popular?1:0)); break;
            case 'name_asc': list.sort((a,b) => a.rawTitle.localeCompare(b.rawTitle, currentLang==='ar'?'ar':'en')); break;
            case 'name_desc': list.sort((a,b) => b.rawTitle.localeCompare(a.rawTitle, currentLang==='ar'?'ar':'en')); break;
            case 'size_asc': list.sort((a,b) => parseSizeToMB(a.parsedData.size) - parseSizeToMB(b.parsedData.size)); break;
            case 'size_desc': list.sort((a,b) => parseSizeToMB(b.parsedData.size) - parseSizeToMB(a.parsedData.size)); break;
        }
        return list;
    }

    function renderLibrary() {
        const grid = document.getElementById('awad-products-grid');
        const empty = document.getElementById('awad-empty-state');
        const loadMoreBtn = document.getElementById('awad-load-more');
        const resultsCount = document.getElementById('awad-results-count');
        if (!grid || !empty || !loadMoreBtn || !resultsCount) return;

        const filtered = getFilteredSortedTopics();
        const visible = filtered.slice(0, state.visibleCount);
        grid.innerHTML = '';
        const frag = document.createDocumentFragment();
        visible.forEach(topic => frag.appendChild(createCard(topic)));
        grid.appendChild(frag);
        resultsCount.textContent = t('showing_results').replace('{count}', visible.length).replace('{total}', filtered.length);
        empty.hidden = filtered.length !== 0;
        loadMoreBtn.hidden = filtered.length <= visible.length;
    }

    function renderAllSections() {
        renderCategories();
        renderStats();
        renderFeatured();
        renderPopular();
        renderLatest();
        renderLibrary();
        renderFavorites();
        renderRecent();
        updateBottomBar();
        updateAdminUI();
    }

    // ===== الإجراءات =====
    function resetFilters() {
        state.filters = { platform:[], category:[], type:[], price:[], size:[], downloadType:[], status:[], favoritesOnly:false };
        state.query = '';
        const searchInput = document.getElementById('awad-search-input');
        if (searchInput) searchInput.value = '';
        renderFilterPanel();
        renderLibrary();
        showToast(t('filters_reset'), 'success');
    }

    function toggleSelect(id) {
        id = Number(id);
        if (state.selected.has(id)) state.selected.delete(id);
        else state.selected.add(id);
        document.querySelectorAll(`.awad-select-check[data-id="${id}"]`).forEach(cb => cb.checked = state.selected.has(id));
        updateBottomBar();
    }

    function updateBottomBar() {
        const bar = document.getElementById('awad-bottom-bar');
        const count = state.selected.size;
        if (bar) {
            bar.hidden = count === 0;
            document.getElementById('awad-selected-count').textContent = count;
        }
    }

    function clearSelection() {
        state.selected.clear();
        document.querySelectorAll('.awad-select-check').forEach(cb => cb.checked = false);
        updateBottomBar();
        showToast(t('clear_selection'), 'info');
    }

    function downloadSelected() {
        [...state.selected].forEach(id => {
            const topic = state.allTopicsData.find(t => t.topicId === id);
            if (topic) downloadTopic(topic);
        });
        clearSelection();
    }

    function downloadTopic(topic) {
        const data = topic.parsedData;
        if (data.downloadType === 'multipart') {
            sortedParts(data).forEach(p => openSafe(p.downloadUrl || p.servers?.[0]?.url));
        } else {
            openSafe(data.downloadUrl || data.servers?.[0]?.url);
        }
        showToast(t('download_started'), 'success');
    }

    function toggleFavorite(id) {
        id = Number(id);
        if (state.favorites.has(id)) {
            state.favorites.delete(id);
            showToast(t('removed_fav'), 'info');
        } else {
            state.favorites.add(id);
            showToast(t('added_fav'), 'success');
        }
        localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...state.favorites]));
        renderFavorites();
        document.querySelectorAll(`[data-action="favorite"][data-id="${id}"]`).forEach(btn => {
            const isFav = state.favorites.has(id);
            btn.classList.toggle('awad-active', isFav);
            const icon = btn.querySelector('i');
            if (icon) icon.className = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        });
    }

    // ===== نافذة التفاصيل =====
    function addRecent(id) {
        id = Number(id);
        state.recentlyViewed = [id, ...state.recentlyViewed.filter(x => x !== id)].slice(0, 8);
        localStorage.setItem(STORAGE_KEYS.recent, JSON.stringify(state.recentlyViewed));
        renderRecent();
    }

    function showDetails(topicId) {
        const topic = state.allTopicsData.find(t => t.topicId === Number(topicId));
        if (!topic) return;
        addRecent(topic.topicId);
        state.modalPartsSelection.clear();
        const body = document.getElementById('awad-modal-body');
        if (!body) return;
        body.innerHTML = '';

        const media = document.createElement('div');
        media.className = 'awad-modal-media';
        const img = document.createElement('img');
        img.alt = topic.rawTitle;
        img.src = safeUrl(topic.parsedData.img) || 'https://picsum.photos/seed/fallback/600/400';
        media.appendChild(img);
        body.appendChild(media);

        const title = document.createElement('h2');
        title.className = 'awad-modal-title';
        title.textContent = topic.rawTitle;
        body.appendChild(title);

        const desc = document.createElement('p');
        desc.className = 'awad-modal-desc';
        desc.textContent = topic.parsedData.desc || 'لا يوجد وصف';
        body.appendChild(desc);

        const meta = document.createElement('div');
        meta.className = 'awad-modal-meta';
        const metaItems = [
            [t('category_label'), getCatLabel(topic.parsedData.category)],
            [t('platform_label'), topic.parsedData.platform],
            [t('version_label'), topic.parsedData.version || '—'],
            [t('size_label'), getTotalSize(topic.parsedData)],
            [t('requirements_label'), topic.parsedData.os || '—'],
            [t('status_label'), topic.parsedData.status],
            [t('downloads_label'), formatNum(topic.parsedData.downloads || 0)],
            [t('updated_label'), formatDate(topic.parsedData.updated)]
        ];
        metaItems.forEach(([lbl, val]) => {
            const div = document.createElement('div');
            div.className = 'awad-meta-item';
            const strong = document.createElement('strong');
            strong.textContent = lbl;
            div.appendChild(strong);
            div.appendChild(document.createTextNode(val));
            meta.appendChild(div);
        });
        body.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'awad-modal-actions';
        const favBtn = document.createElement('button');
        favBtn.className = 'awad-btn awad-btn-secondary';
        favBtn.dataset.action = 'favorite';
        favBtn.dataset.id = topic.topicId;
        favBtn.innerHTML = `<i class="fa-${state.favorites.has(topic.topicId) ? 'solid' : 'regular'} fa-heart"></i> ${state.favorites.has(topic.topicId) ? t('favorite_remove') : t('favorite_add')}`;
        actions.appendChild(favBtn);
        const shareBtn = document.createElement('button');
        shareBtn.className = 'awad-btn awad-btn-secondary';
        shareBtn.dataset.action = 'share';
        shareBtn.dataset.id = topic.topicId;
        shareBtn.innerHTML = `<i class="fa-solid fa-share-nodes"></i> ${t('share')}`;
        actions.appendChild(shareBtn);
        const commentsBtn = document.createElement('button');
        commentsBtn.className = 'awad-btn awad-btn-secondary';
        commentsBtn.dataset.action = 'show-comments';
        commentsBtn.dataset.id = topic.topicId;
        commentsBtn.innerHTML = `<i class="fa-solid fa-comments"></i> ${t('comments_title')}`;
        actions.appendChild(commentsBtn);
        body.appendChild(actions);

        body.appendChild(buildDownloadSection(topic.parsedData));
        openModal('awad-modal-backdrop');
    }

    function buildDownloadSection(data) {
        const section = document.createElement('div');
        section.className = 'awad-download-section';
        const heading = document.createElement('h3');
        heading.className = 'awad-download-heading';
        heading.innerHTML = '<i class="fa-solid fa-download"></i> ' + t('download');
        section.appendChild(heading);

        if (data.downloadType === 'multipart') {
            const parts = sortedParts(data);
            const totalMB = parts.reduce((sum,p) => sum + parseSizeToMB(p.size), 0);
            const info = document.createElement('p');
            info.style.fontSize = '.85rem';
            info.style.color = 'var(--awad-text-secondary)';
            info.textContent = `${t('total_size')}: ${formatMB(totalMB)} • ${parts.length} ${t('parts')}`;
            section.appendChild(info);

            const note = document.createElement('p');
            note.className = 'awad-parts-note';
            note.innerHTML = '<i class="fa-solid fa-circle-info"></i> ' + t('extract_note');
            section.appendChild(note);

            const controls = document.createElement('div');
            controls.style.display = 'flex';
            controls.style.gap = '6px';
            controls.style.flexWrap = 'wrap';
            controls.style.marginBottom = '8px';
            const selectAllBtn = document.createElement('button');
            selectAllBtn.className = 'awad-btn awad-btn-secondary awad-btn-sm';
            selectAllBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> ' + t('select_all_parts');
            selectAllBtn.dataset.action = 'select-all-parts';
            selectAllBtn.dataset.id = data.id;
            controls.appendChild(selectAllBtn);
            const clearBtn = document.createElement('button');
            clearBtn.className = 'awad-btn awad-btn-ghost awad-btn-sm';
            clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> ' + t('clear_parts');
            clearBtn.dataset.action = 'clear-parts';
            controls.appendChild(clearBtn);
            const downloadSelectedBtn = document.createElement('button');
            downloadSelectedBtn.className = 'awad-btn awad-btn-primary awad-btn-sm';
            downloadSelectedBtn.innerHTML = '<i class="fa-solid fa-download"></i> ' + t('download_selected_parts');
            downloadSelectedBtn.dataset.action = 'download-selected-parts';
            downloadSelectedBtn.dataset.id = data.id;
            controls.appendChild(downloadSelectedBtn);
            section.appendChild(controls);

            const downloadAllBtn = document.createElement('button');
            downloadAllBtn.className = 'awad-btn awad-btn-primary';
            downloadAllBtn.innerHTML = '<i class="fa-solid fa-download"></i> ' + t('download_all_parts');
            downloadAllBtn.dataset.action = 'download-all-parts';
            downloadAllBtn.dataset.id = data.id;
            section.appendChild(downloadAllBtn);

            const list = document.createElement('div');
            list.className = 'awad-parts-list';
            parts.forEach((part, index) => {
                const row = document.createElement('div');
                row.className = 'awad-part-row';
                const checkLabel = document.createElement('label');
                checkLabel.className = 'awad-part-check-label';
                const check = document.createElement('input');
                check.type = 'checkbox';
                check.className = 'awad-part-check';
                check.dataset.partId = part.id;
                check.checked = state.modalPartsSelection.has(part.id);
                checkLabel.appendChild(check);
                row.appendChild(checkLabel);
                const infoDiv = document.createElement('div');
                infoDiv.className = 'awad-part-info';
                const partName = document.createElement('strong');
                partName.className = 'awad-part-name';
                partName.textContent = part.name;
                infoDiv.appendChild(partName);
                const partFile = document.createElement('span');
                partFile.className = 'awad-part-file';
                partFile.textContent = part.filename;
                infoDiv.appendChild(partFile);
                const partSize = document.createElement('span');
                partSize.className = 'awad-part-size';
                partSize.textContent = part.size;
                infoDiv.appendChild(partSize);
                row.appendChild(infoDiv);
                const partActions = document.createElement('div');
                partActions.className = 'awad-part-actions';
                if (part.servers && part.servers.length > 0) {
                    const select = document.createElement('select');
                    select.className = 'awad-server-select';
                    part.servers.forEach(s => {
                        const opt = document.createElement('option');
                        opt.value = safeUrl(s.url);
                        opt.textContent = s.name;
                        select.appendChild(opt);
                    });
                    partActions.appendChild(select);
                }
                const dlPartBtn = document.createElement('button');
                dlPartBtn.className = 'awad-btn awad-btn-secondary awad-btn-sm';
                dlPartBtn.dataset.action = 'download-part';
                dlPartBtn.dataset.id = data.id;
                dlPartBtn.dataset.partIndex = index;
                dlPartBtn.innerHTML = '<i class="fa-solid fa-download"></i> ' + t('download');
                partActions.appendChild(dlPartBtn);
                row.appendChild(partActions);
                list.appendChild(row);
            });
            section.appendChild(list);
        } else {
            const url = safeUrl(data.downloadUrl || data.servers?.[0]?.url);
            if (url) {
                const btn = document.createElement('button');
                btn.className = 'awad-btn awad-btn-primary';
                btn.dataset.action = 'download-server';
                btn.dataset.url = url;
                btn.innerHTML = '<i class="fa-solid fa-download"></i> ' + t('download');
                section.appendChild(btn);
            }
            if (data.servers && data.servers.length > 1) {
                const serverList = document.createElement('div');
                serverList.className = 'awad-server-list';
                data.servers.forEach(s => {
                    const btn = document.createElement('button');
                    btn.className = 'awad-server-btn';
                    btn.dataset.action = 'download-server';
                    btn.dataset.url = safeUrl(s.url);
                    btn.innerHTML = '<i class="fa-solid fa-server"></i> ' + s.name;
                    serverList.appendChild(btn);
                });
                section.appendChild(serverList);
            }
        }
        return section;
    }

    function downloadPart(id, index, btn) {
        const topic = state.allTopicsData.find(t => t.topicId === Number(id));
        if (!topic) return;
        const parts = sortedParts(topic.parsedData);
        const part = parts[index];
        if (!part) return;
        const row = btn.closest('.awad-part-row');
        const select = row?.querySelector('.awad-server-select');
        const url = safeUrl(select?.value || part.downloadUrl || part.servers?.[0]?.url);
        openSafe(url);
        showToast(t('download_started'), 'success');
    }

    function downloadAllParts(id) {
        const topic = state.allTopicsData.find(t => t.topicId === Number(id));
        if (!topic) return;
        sortedParts(topic.parsedData).forEach(p => openSafe(p.downloadUrl || p.servers?.[0]?.url));
        showToast(t('download_started'), 'success');
    }

    function downloadSelectedParts(id) {
        const topic = state.allTopicsData.find(t => t.topicId === Number(id));
        if (!topic) return;
        sortedParts(topic.parsedData)
            .filter(p => state.modalPartsSelection.has(p.id))
            .forEach(p => openSafe(p.downloadUrl || p.servers?.[0]?.url));
        showToast(t('download_started'), 'success');
    }

    function selectAllParts(id, checked) {
        const topic = state.allTopicsData.find(t => t.topicId === Number(id));
        if (!topic) return;
        const parts = sortedParts(topic.parsedData);
        parts.forEach(p => checked ? state.modalPartsSelection.add(p.id) : state.modalPartsSelection.delete(p.id));
        document.querySelectorAll('.awad-part-check').forEach(ch => {
            ch.checked = state.modalPartsSelection.has(Number(ch.dataset.partId));
        });
    }

    function clearPartsSelection() {
        state.modalPartsSelection.clear();
        document.querySelectorAll('.awad-part-check').forEach(ch => ch.checked = false);
    }

    async function shareItem(id) {
        const topic = state.allTopicsData.find(t => t.topicId === Number(id));
        if (!topic) return;
        const url = topic.topicUrl || window.location.href;
        if (navigator.share) {
            try { await navigator.share({ title: topic.rawTitle, text: topic.parsedData.desc, url }); } catch {}
        } else {
            if (await copyText(url)) showToast(t('copy_link_success'), 'success');
        }
    }

    // ===== اللغة والثيم =====
    function applyTheme() {
        root.setAttribute('data-theme', currentTheme);
        localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
        const btn = document.getElementById('awad-theme-toggle');
        if (btn) btn.innerHTML = currentTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }

    function applyLanguage() {
        root.setAttribute('lang', currentLang);
        root.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem(STORAGE_KEYS.lang, currentLang);
        document.title = currentLang === 'ar' ? 'عوض تك | مكتبة التحميل الرقمية' : 'Awad Tech | Digital Download Library';
        const langBtn = document.getElementById('awad-lang-toggle');
        if (langBtn) langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';

        document.querySelectorAll('#awad-download-library [data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                const icons = el.querySelectorAll('i');
                el.textContent = translations[currentLang][key];
                if (icons.length > 0) icons.forEach(icon => el.prepend(icon));
            }
        });
        document.querySelectorAll('#awad-download-library [data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[currentLang][key]) el.placeholder = translations[currentLang][key];
        });
    }

    function toggleTheme() { currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; applyTheme(); }
    function toggleLanguage() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage();
        renderFilterPanel();
        renderAllSections();
    }

    // ===== الإدارة: قراءة المواضيع من المنتدى =====
    function setLoader(percent) {
        const lBar = document.getElementById('loadingBar');
        if (lBar) {
            lBar.style.width = percent + '%';
            if (percent >= 100) setTimeout(() => { lBar.style.width = '0%'; }, 500);
        }
    }

    async function loadDlItems(url) {
        setLoader(10);
        const loaderArea = document.getElementById('loaderArea');
        const emptyGlobal = document.getElementById('emptyGlobalState');
        if (loaderArea) loaderArea.style.display = 'block';
        if (emptyGlobal) emptyGlobal.style.display = 'none';
        state.allTopicsData = [];
        state.loading = true;

        // تنظيف الشبكات
        ['software', 'app', 'pcgame', 'psgame', 'ebook'].forEach(g => {
            const grid = document.getElementById(`grid-${g}`);
            const section = document.getElementById(`sec-${g}`);
            const pagination = document.getElementById(`pagination-${g}`);
            if (grid) grid.innerHTML = '';
            if (section) section.style.display = 'none';
            if (pagination) pagination.innerHTML = '';
        });

        try {
            setLoader(20);
            const res = await fetch(`/f${DL_FORUM_ID}-montada?_t=${Date.now()}`);
            const html = await res.text();
            if (html.includes('يُرجى الانتظار') || html.includes('cloudflare') || html.includes('anti-spam')) {
                setTimeout(() => loadDlItems(url), 2500);
                return;
            }
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const canPost = doc.querySelector('a[href*="mode=newtopic"]');
            isAdmin = !!canPost && !canPost.innerHTML.includes('مغلق');

            let pageUrls = new Set();
            pageUrls.add(`/f${DL_FORUM_ID}-montada`);
            doc.querySelectorAll('.pagination a, a.pag-img, .page-numbers a, a[href^="/f' + DL_FORUM_ID + 'p"]').forEach(a => {
                let href = a.getAttribute('href');
                if (href && href.match(new RegExp('^/f' + DL_FORUM_ID + 'p\\d+-'))) pageUrls.add(href.split('?')[0]);
            });

            setLoader(30);
            let allTopicsList = [];
            let indexPromises = Array.from(pageUrls).map(async (pUrl) => {
                try {
                    let pRes = await fetch(pUrl);
                    let pHtml = await pRes.text();
                    let pDoc = new DOMParser().parseFromString(pHtml, 'text/html');
                    let topics = Array.from(pDoc.querySelectorAll('div.post-wrap, .posts-section, .block-topics-content, li.row, tr.topicrow, div.topic'));
                    topics.forEach(t => {
                        let titleNode = t.querySelector('.posts-description h3 a, .topic-title, .topictitle, h2 a.topictitle');
                        if (titleNode) {
                            let topicUrl = titleNode.getAttribute('href');
                            let rawTitle = titleNode.textContent.trim();
                            let topicIdMatch = topicUrl.match(/t(\d+)-/);
                            let topicId = topicIdMatch ? parseInt(topicIdMatch[1]) : 0;
                            if (!allTopicsList.some(item => item.topicId === topicId)) {
                                allTopicsList.push({ topicUrl, rawTitle, topicId });
                            }
                        }
                    });
                } catch (e) {}
            });
            await Promise.all(indexPromises);

            if (allTopicsList.length === 0) {
                setLoader(100);
                if (loaderArea) loaderArea.style.display = 'none';
                if (emptyGlobal) emptyGlobal.style.display = 'block';
                state.loading = false;
                return;
            }

            setLoader(50);
            let validData = [];
            const BATCH_SIZE = 5;
            for (let i = 0; i < allTopicsList.length; i += BATCH_SIZE) {
                const batch = allTopicsList.slice(i, i + BATCH_SIZE);
                const results = await Promise.all(batch.map(async (tInfo) => {
                    try {
                        const tRes = await fetch(tInfo.topicUrl);
                        const tHtml = await tRes.text();
                        const tDoc = new DOMParser().parseFromString(tHtml, 'text/html');
                        let contentNode = tDoc.querySelector('.post-content, .content, .entry-content')?.cloneNode(true);
                        if (!contentNode) return null;
                        contentNode.querySelectorAll('.post-signature, .signature_div, div[id^="sig"], div[class*="signature"]').forEach(e => e.remove());
                        let parsedData = parseDlData(contentNode.innerHTML);
                        const editBtn = tDoc.querySelector('a[href*="mode=editpost"]')?.getAttribute('href') || '';
                        const delBtn = tDoc.querySelector('a[href*="mode=delete"]')?.getAttribute('href') || '';
                        return { rawTitle: tInfo.rawTitle, parsedData, topicUrl: tInfo.topicUrl, editBtn, delBtn, topicId: tInfo.topicId };
                    } catch (e) { return null; }
                }));
                validData.push(...results.filter(d => d !== null));
                setLoader(50 + Math.floor((i / allTopicsList.length) * 40));
                if (i + BATCH_SIZE < allTopicsList.length) await new Promise(r => setTimeout(r, 200));
            }

            setLoader(95);
            state.allTopicsData = validData;
            if (loaderArea) loaderArea.style.display = 'none';
            renderAllSections();
            setLoader(100);
        } catch (e) {
            setLoader(100);
            if (loaderArea) loaderArea.style.display = 'none';
            if (emptyGlobal) emptyGlobal.style.display = 'block';
        } finally {
            state.loading = false;
        }
    }

    function parseDlData(htmlContent) {
        let temp = document.createElement('div');
        temp.innerHTML = htmlContent.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');
        let text = temp.innerText || temp.textContent;

        const extract = (str, key, nextKeys) => {
            let start = str.search(new RegExp(key + '\\s*:', 'i'));
            if (start === -1) return '';
            let keyMatch = str.match(new RegExp(key + '\\s*:', 'i'));
            start += keyMatch[0].length;
            let end = str.length;
            for (let nk of nextKeys) {
                let idx = str.search(new RegExp(nk + '\\s*:', 'i'));
                if (idx !== -1 && idx > start && idx < end) end = idx;
            }
            return str.substring(start, end).trim();
        };

        const keysOrder = ['DL_TYPE', 'DL_LINK_TYPE', 'DL_LINK', 'DL_IMG', 'DL_SIZE', 'DL_OS', 'DL_KEY', 'DL_DESC'];
        let data = {};
        keysOrder.forEach((k, i) => {
            let nextKeys = keysOrder.slice(i + 1);
            data[k] = extract(text, k, nextKeys);
        });

        let determinedType = (data['DL_TYPE'] || '').toLowerCase();
        if (!['software', 'app', 'pcgame', 'psgame', 'ebook'].includes(determinedType)) determinedType = 'software';

        let res = {
            type: determinedType,
            linkType: (data['DL_LINK_TYPE'] || 'versions').toLowerCase(),
            link: [],
            img: decodeUrl(data['DL_IMG']) || 'https://placehold.co/600x400/1e293b/00e5ff?text=No+Image',
            size: data['DL_SIZE'] || '',
            os: data['DL_OS'] || '',
            key: data['DL_KEY'] || '',
            desc: data['DL_DESC'] || 'لا يوجد وصف متاح.',
            platform: data['DL_PLATFORM'] || 'Windows',
            category: data['DL_CATEGORY'] || 'Tools',
            version: data['DL_VERSION'] || '',
            downloads: parseInt(data['DL_DOWNLOADS']) || 0,
            featured: data['DL_FEATURED'] === 'true' || false,
            popular: data['DL_POPULAR'] === 'true' || false,
            createdAt: data['DL_CREATED'] || new Date().toISOString().split('T')[0],
            updated: data['DL_UPDATED'] || new Date().toISOString().split('T')[0],
            status: data['DL_STATUS'] || 'Free',
            downloadType: data['DL_DOWNLOAD_TYPE'] || 'single',
            downloadUrl: decodeUrl(data['DL_DOWNLOAD_URL'] || ''),
            parts: [],
            servers: []
        };

        if (data['DL_LINK']) {
            res.link = data['DL_LINK'].split('|').map(l => {
                let p = l.trim(), url = p, name = '', date = '';
                let mDate = p.match(/(.*?)\s*\[(.*?)\]$/);
                if (mDate) { p = mDate[1].trim(); date = mDate[2].trim(); }
                let mName = p.match(/(.*?)\s*\{(.*?)\}$/);
                if (mName) { url = mName[1].trim(); name = mName[2].trim(); }
                else { url = p.trim(); }
                url = decodeUrl(url);
                return { url, name, date };
            }).filter(l => l.url);
        }

        if (res.linkType === 'parts' && res.link.length > 0) {
            res.parts = res.link.map((link, idx) => ({
                id: idx + 1,
                name: link.name || `Part ${idx + 1}`,
                filename: link.name || `part${idx + 1}`,
                size: link.date || '',
                downloadUrl: link.url,
                servers: []
            }));
            res.link = [];
            res.downloadType = 'multipart';
        }

        if (data['DL_SERVERS']) {
            try {
                const serversData = JSON.parse(decodeUrl(data['DL_SERVERS']));
                if (Array.isArray(serversData)) res.servers = serversData;
            } catch (e) {}
        }

        return res;
    }

    function decodeUrl(url) { return url.replace(/hxxtps:\/\//gi, 'https://').replace(/hxxtp:\/\//gi, 'http://'); }
    function encodeUrl(url) { return url.replace(/https:\/\//gi, 'hxxtps://').replace(/http:\/\//gi, 'hxxtp://'); }

    // ===== الإدارة: قائمة المواضيع =====
    function updateAdminUI() {
        const adminNavLink = document.getElementById('awad-admin-nav-link');
        const adminPanelSection = document.getElementById('awad-admin-panel');
        const adminFab = document.getElementById('awad-admin-fab');
        if (adminNavLink) adminNavLink.hidden = !isAdmin;
        if (adminPanelSection) adminPanelSection.hidden = !isAdmin;
        if (adminFab) adminFab.hidden = !isAdmin;
        if (isAdmin) renderAdminItemsList();
    }

    function renderAdminItemsList() {
        const container = document.getElementById('awad-admin-items-list');
        if (!container || !isAdmin) return;
        container.innerHTML = '';
        const frag = document.createDocumentFragment();
        state.allTopicsData.forEach(topic => {
            const row = document.createElement('div');
            row.className = 'awad-admin-item-row';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'awad-admin-item-title';
            titleSpan.textContent = topic.rawTitle;
            row.appendChild(titleSpan);
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'awad-admin-item-actions';
            if (topic.editBtn) {
                const editBtn = document.createElement('button');
                editBtn.className = 'awad-btn awad-btn-secondary awad-btn-sm';
                editBtn.innerHTML = '<i class="fa-solid fa-pen"></i> ' + t('admin_edit');
                editBtn.addEventListener('click', () => editDlItem(topic.editBtn));
                actionsDiv.appendChild(editBtn);
            }
            if (topic.delBtn) {
                const delBtn = document.createElement('button');
                delBtn.className = 'awad-btn awad-btn-ghost awad-btn-sm';
                delBtn.innerHTML = '<i class="fa-solid fa-trash"></i> ' + t('admin_delete');
                delBtn.addEventListener('click', () => confirmDelete(topic.delBtn));
                actionsDiv.appendChild(delBtn);
            }
            row.appendChild(actionsDiv);
            frag.appendChild(row);
        });
        container.appendChild(frag);
    }

    // ===== الإدارة: نافذة إضافة/تعديل (نسخة مصححة) =====
    function openAdminModal(itemId = null) {
        const isEdit = itemId !== null;
        const item = isEdit ? state.allTopicsData.find(t => t.topicId === itemId)?.parsedData : null;
        const body = document.getElementById('awad-admin-modal-body');
        if (!body) return;
        body.innerHTML = '';

        const title = document.createElement('h2');
        title.className = 'awad-modal-title';
        title.textContent = isEdit ? t('admin_title_edit') : t('admin_title_add');
        body.appendChild(title);

        const tabs = document.createElement('div');
        tabs.className = 'awad-admin-tabs';
        const tabNames = [
            { key: 'general', label: t('admin_general_tab') },
            { key: 'media', label: t('admin_media_tab') },
            { key: 'download', label: t('admin_download_tab') },
            { key: 'publish', label: t('admin_publish_tab') }
        ];
        tabNames.forEach((tab, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'awad-admin-tab' + (i === 0 ? ' awad-active' : '');
            btn.dataset.tab = tab.key;
            btn.textContent = tab.label;
            btn.addEventListener('click', () => {
                body.querySelectorAll('.awad-admin-tab').forEach(t => t.classList.remove('awad-active'));
                body.querySelectorAll('.awad-admin-tab-content').forEach(c => c.classList.remove('awad-active'));
                btn.classList.add('awad-active');
                body.querySelector(`[data-tab-content="${tab.key}"]`).classList.add('awad-active');
            });
            tabs.appendChild(btn);
        });
        body.appendChild(tabs);

        const form = document.createElement('form');
        form.id = 'awad-admin-form';
        form.className = 'awad-admin-form';

        const generalDiv = document.createElement('div');
        generalDiv.className = 'awad-admin-tab-content awad-active';
        generalDiv.dataset.tabContent = 'general';
        generalDiv.innerHTML = `
            <label>${t('admin_title_label')}</label>
            <input type="text" name="title" value="${item?.title || ''}" required>
            <label>${t('admin_title_en_label')}</label>
            <input type="text" name="titleEn" value="${item?.titleEn || ''}">
            <label>${t('admin_desc_label')}</label>
            <textarea name="description" rows="3">${item?.desc || ''}</textarea>
            <label>${t('admin_type_label')}</label>
            <select name="type">
                <option value="software" ${item?.type === 'software' ? 'selected' : ''}>برامج</option>
                <option value="app" ${item?.type === 'app' ? 'selected' : ''}>تطبيقات</option>
                <option value="pcgame" ${item?.type === 'pcgame' ? 'selected' : ''}>ألعاب PC</option>
                <option value="psgame" ${item?.type === 'psgame' ? 'selected' : ''}>ألعاب PS</option>
                <option value="ebook" ${item?.type === 'ebook' ? 'selected' : ''}>كتب</option>
            </select>
            <label>${t('admin_platform_label')}</label>
            <select name="platform">
                ${platformKeys.map(p => `<option value="${p}" ${item?.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
            <label>${t('admin_category_label')}</label>
            <select name="category">
                ${['Office','Multimedia','Graphics','Internet','Security','Education','Tools','Development','Books'].map(c => `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${getCatLabel(c)}</option>`).join('')}
            </select>
            <label>${t('admin_status_label')}</label>
            <select name="status">
                <option value="Free" ${item?.status === 'Free' ? 'selected' : ''}>Free</option>
                <option value="Paid" ${item?.status === 'Paid' ? 'selected' : ''}>Paid</option>
            </select>
            <label>${t('admin_version_label')}</label>
            <input type="text" name="version" value="${item?.version || ''}">
            <label>${t('admin_size_label')}</label>
            <input type="text" name="size" value="${item?.size || ''}">
            <label>${t('admin_requirements_label')}</label>
            <input type="text" name="requirements" value="${item?.os || ''}">
            <label>${t('admin_updated_label')}</label>
            <input type="date" name="updated" value="${item?.updated || ''}">
            <label>${t('admin_downloads_label')}</label>
            <input type="number" name="downloads" value="${item?.downloads || 0}">
        `;
        form.appendChild(generalDiv);

        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'awad-admin-tab-content';
        mediaDiv.dataset.tabContent = 'media';
        mediaDiv.innerHTML = `
            <label>${t('admin_image_label')}</label>
            <input type="url" name="image" id="awad-admin-image-input" value="${item?.img || ''}">
            <div id="awad-admin-image-preview" class="awad-admin-image-preview">
                ${item?.img ? `<img src="${safeUrl(item.img)}" style="max-width:100%;max-height:200px;">` : ''}
            </div>
        `;
        form.appendChild(mediaDiv);

        const downloadDiv = document.createElement('div');
        downloadDiv.className = 'awad-admin-tab-content';
        downloadDiv.dataset.tabContent = 'download';
        downloadDiv.innerHTML = `
            <label>${t('admin_download_type_label')}</label>
            <select name="downloadType" id="awad-admin-download-type">
                <option value="single" ${item?.downloadType !== 'multipart' ? 'selected' : ''}>${t('admin_single_file')}</option>
                <option value="multipart" ${item?.downloadType === 'multipart' ? 'selected' : ''}>${t('admin_multi_part')}</option>
            </select>
            <div id="awad-admin-single-download">
                <label>${t('admin_download_url_label')}</label>
                <input type="url" name="downloadUrl" value="${item?.downloadUrl || ''}">
            </div>
            <div id="awad-admin-parts-container">
                <h4>${t('admin_parts_tab')}</h4>
                <div id="awad-admin-parts-list">
                    ${item?.parts && item.downloadType === 'multipart' ? item.parts.map((p, i) => `
                        <div class="awad-admin-part-row">
                            <input type="text" name="part_name_${i}" placeholder="${t('admin_part_name_label')}" value="${p.name}">
                            <input type="text" name="part_filename_${i}" placeholder="${t('admin_part_filename_label')}" value="${p.filename}">
                            <input type="text" name="part_size_${i}" placeholder="${t('admin_part_size_label')}" value="${p.size}">
                            <input type="url" name="part_url_${i}" placeholder="${t('admin_part_url_label')}" value="${p.downloadUrl}">
                        </div>
                    `).join('') : ''}
                </div>
                <button type="button" class="awad-btn awad-btn-secondary awad-btn-sm" id="awad-admin-add-part">${t('admin_add_part')}</button>
            </div>
        `;
        form.appendChild(downloadDiv);

        const publishDiv = document.createElement('div');
        publishDiv.className = 'awad-admin-tab-content';
        publishDiv.dataset.tabContent = 'publish';
        publishDiv.innerHTML = `
            <label><input type="checkbox" name="featured" ${item?.featured ? 'checked' : ''}> ${t('admin_featured_label')}</label>
            <label><input type="checkbox" name="popular" ${item?.popular ? 'checked' : ''}> ${t('admin_popular_label')}</label>
        `;
        form.appendChild(publishDiv);

        const actions = document.createElement('div');
        actions.className = 'awad-admin-actions';
        actions.style.marginTop = '20px';
        const saveBtn = document.createElement('button');
        saveBtn.type = 'submit';
        saveBtn.className = 'awad-btn awad-btn-primary';
        saveBtn.innerHTML = '<i class="fa-solid fa-save"></i> ' + t('admin_save');
        actions.appendChild(saveBtn);
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'awad-btn awad-btn-ghost';
        cancelBtn.textContent = t('admin_cancel');
        cancelBtn.addEventListener('click', () => closeModal('awad-admin-modal-backdrop'));
        actions.appendChild(cancelBtn);
        form.appendChild(actions);

        body.appendChild(form);
        openModal('awad-admin-modal-backdrop');

        document.getElementById('awad-admin-add-part')?.addEventListener('click', () => {
            const list = document.getElementById('awad-admin-parts-list');
            const index = list.children.length;
            const row = document.createElement('div');
            row.className = 'awad-admin-part-row';
            row.innerHTML = `
                <input type="text" name="part_name_${index}" placeholder="${t('admin_part_name_label')}">
                <input type="text" name="part_filename_${index}" placeholder="${t('admin_part_filename_label')}">
                <input type="text" name="part_size_${index}" placeholder="${t('admin_part_size_label')}">
                <input type="url" name="part_url_${index}" placeholder="${t('admin_part_url_label')}">
            `;
            list.appendChild(row);
        });

        const imageInput = document.getElementById('awad-admin-image-input');
        imageInput?.addEventListener('input', () => {
            const preview = document.getElementById('awad-admin-image-preview');
            const url = safeUrl(imageInput.value);
            if (preview) preview.innerHTML = url ? `<img src="${url}" style="max-width:100%;max-height:200px;">` : '';
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const newItem = {
                title: formData.get('title') || '',
                titleEn: formData.get('titleEn') || '',
                desc: formData.get('description') || '',
                img: formData.get('image') || '',
                type: formData.get('type') || 'software',
                platform: formData.get('platform') || 'Windows',
                category: formData.get('category') || 'Tools',
                status: formData.get('status') || 'Free',
                version: formData.get('version') || '',
                size: formData.get('size') || '',
                os: formData.get('requirements') || '',
                updated: formData.get('updated') || new Date().toISOString().split('T')[0],
                downloads: Number(formData.get('downloads')) || 0,
                featured: formData.get('featured') === 'on',
                popular: formData.get('popular') === 'on',
                downloadType: formData.get('downloadType') || 'single',
                downloadUrl: formData.get('downloadUrl') || '',
                parts: []
            };

            const partRows = form.querySelectorAll('.awad-admin-part-row');
            partRows.forEach((row, index) => {
                const name = formData.get(`part_name_${index}`) || `Part ${index+1}`;
                const filename = formData.get(`part_filename_${index}`) || '';
                const size = formData.get(`part_size_${index}`) || '';
                const url = formData.get(`part_url_${index}`) || '';
                newItem.parts.push({ id: index+1, name, filename, size, downloadUrl: url, servers: [] });
            });

            // بناء محتوى الموضوع المناسب للمنتدى
            let linkStr = '';
            if (newItem.downloadType === 'multipart' && newItem.parts.length > 0) {
                linkStr = newItem.parts.map(p => `${encodeUrl(p.downloadUrl)} {${p.name}} [${p.size}]`).join('|');
            } else if (newItem.downloadUrl) {
                linkStr = `${encodeUrl(newItem.downloadUrl)} {أحدث إصدار} [${newItem.updated}]`;
            }

            const content = formatDlContent(newItem, linkStr);
            await saveTopicToForum(content, newItem.title, isEdit ? item.topicUrl : null);
            closeModal('awad-admin-modal-backdrop');
            loadDlItems(`/f${DL_FORUM_ID}-montada`);
        });
    }

    function formatDlContent(item, linkStr) {
        let content = `DL_TYPE:${item.type}\n`;
        content += `DL_LINK_TYPE:${item.downloadType === 'multipart' ? 'parts' : 'versions'}\n`;
        content += `DL_LINK:${linkStr}\n`;
        content += `DL_IMG:${encodeUrl(item.img)}\n`;
        content += `DL_SIZE:${item.size}\n`;
        content += `DL_OS:${item.os}\n`;
        content += `DL_KEY:${item.key || ''}\n`;
        content += `DL_DESC:${item.desc}\n`;
        content += `DL_PLATFORM:${item.platform}\n`;
        content += `DL_CATEGORY:${item.category}\n`;
        content += `DL_VERSION:${item.version}\n`;
        content += `DL_DOWNLOADS:${item.downloads}\n`;
        if (item.featured) content += `DL_FEATURED:true\n`;
        if (item.popular) content += `DL_POPULAR:true\n`;
        content += `DL_UPDATED:${item.updated}\n`;
        content += `DL_STATUS:${item.status}\n`;
        content += `DL_DOWNLOAD_TYPE:${item.downloadType}\n`;
        if (item.downloadUrl) content += `DL_DOWNLOAD_URL:${encodeUrl(item.downloadUrl)}\n`;
        return content;
    }

    async function saveTopicToForum(content, title, editUrl = null) {
        const targetUrl = editUrl || `/post?f=${DL_FORUM_ID}&mode=newtopic`;
        try {
            const fRes = await fetch(targetUrl);
            const doc = new DOMParser().parseFromString(await fRes.text(), 'text/html');
            const form = doc.querySelector('form[name="post"]');
            if (!form) throw new Error("لا تملك صلاحية للإضافة في هذا القسم.");
            const fd = new FormData(form);
            fd.set('subject', title);
            fd.set('message', content);
            fd.set('post', '1');
            let res = await fetch('/post', { method: 'POST', body: fd });
            let responseHtml = await res.text();
            let errDoc = new DOMParser().parseFromString(responseHtml, 'text/html');
            let errorEl = errDoc.querySelector('.errorwrap, .error, p.error, .block-content-error, .error-box, .msg, p.center');
            let hasPostForm = errDoc.querySelector('form[name="post"]');
            let hasSuccessMsg = responseHtml.includes('بنجاح') || responseHtml.includes('تم إرسال');
            if (errorEl && errorEl.textContent.trim() && !hasSuccessMsg) throw new Error(errorEl.textContent.trim());
            else if (hasPostForm && !hasSuccessMsg) throw new Error("رفض السيرفر النشر. تأكد من العنوان أو انتظر 15 ثانية.");
            showToast(t('admin_save') + ' ✓', 'success');
        } catch (e) {
            showToast(e.message || t('error_loading'), 'error');
        }
    }

    async function editDlItem(url) {
        try {
            const res = await fetch(url);
            const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
            const subject = doc.querySelector('input[name="subject"]')?.value || '';
            const message = doc.querySelector('textarea[name="message"]')?.value || '';
            const parsed = parseDlData(message.replace(/<br>/g, '\n'));
            // نستخدم openAdminModal مع بيانات parsed، لكن نحتاج topicId
            // نبحث عن topicId من الرابط
            const idMatch = url.match(/t(\d+)-/);
            const topicId = idMatch ? parseInt(idMatch[1]) : Date.now();
            // إنشاء كائن مؤقت لفتح النافذة مع البيانات
            const tempTopic = { topicId, parsedData: parsed, editBtn: url };
            state.currentEditingTopic = tempTopic;
            openAdminModal(topicId);
            // تعبئة الحقول بعد فتح النافذة
            setTimeout(() => {
                const form = document.getElementById('awad-admin-form');
                if (form) {
                    form.elements.title.value = subject || parsed.title || '';
                    form.elements.titleEn.value = parsed.titleEn || '';
                    form.elements.description.value = parsed.desc || '';
                    form.elements.type.value = parsed.type;
                    form.elements.platform.value = parsed.platform || 'Windows';
                    form.elements.category.value = parsed.category || 'Tools';
                    form.elements.status.value = parsed.status || 'Free';
                    form.elements.version.value = parsed.version || '';
                    form.elements.size.value = parsed.size || '';
                    form.elements.requirements.value = parsed.os || '';
                    form.elements.updated.value = parsed.updated || '';
                    form.elements.downloads.value = parsed.downloads || 0;
                    form.elements.image.value = parsed.img || '';
                    form.elements.downloadType.value = parsed.downloadType || 'single';
                    form.elements.downloadUrl.value = parsed.downloadUrl || '';
                    form.elements.featured.checked = parsed.featured || false;
                    form.elements.popular.checked = parsed.popular || false;
                }
            }, 100);
        } catch (e) {
            showToast(t('error_loading'), 'error');
        }
    }

    function confirmDelete(delUrl) {
        const confirmBody = document.getElementById('awad-confirm-modal-body');
        if (!confirmBody) return;
        confirmBody.innerHTML = `
            <h3>${t('delete_confirm_title')}</h3>
            <p>${t('delete_confirm_text')}</p>
            <div class="awad-confirm-actions">
                <button class="awad-btn awad-btn-danger" id="awad-confirm-yes">${t('delete_yes')}</button>
                <button class="awad-btn awad-btn-ghost" data-action="close-confirm-modal">${t('delete_cancel')}</button>
            </div>
        `;
        openModal('awad-confirm-modal-backdrop');
        document.getElementById('awad-confirm-yes').addEventListener('click', async () => {
            await executeDelete(delUrl);
            closeModal('awad-confirm-modal-backdrop');
            sessionStorage.removeItem('zzone_cache');
            loadDlItems(`/f${DL_FORUM_ID}-montada`);
        });
    }

    async function executeDelete(url) {
        try {
            const res = await fetch(url);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const form = doc.querySelector('form[action*="mode=delete"], form[action="/post"]');
            if (form) {
                const fd = new FormData(form);
                fd.append('confirm', '1');
                await fetch(form.action, { method: 'POST', body: fd });
                return true;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    // ===== التعليقات =====
    function showComments(topicId) {
        const topic = state.allTopicsData.find(t => t.topicId === Number(topicId));
        if (!topic) return;
        const body = document.getElementById('awad-comments-modal-body');
        if (!body) return;
        body.innerHTML = '';

        const title = document.createElement('h3');
        title.className = 'awad-modal-title';
        title.innerHTML = '<i class="fa-solid fa-comments"></i> ' + t('comments_title');
        body.appendChild(title);

        const commentsList = document.createElement('div');
        commentsList.className = 'awad-comments-list';
        const empty = document.createElement('p');
        empty.className = 'awad-empty';
        empty.innerHTML = '<i class="fa-regular fa-comment-dots"></i> ' + t('comments_no_comments');
        commentsList.appendChild(empty);
        body.appendChild(commentsList);

        const form = document.createElement('form');
        form.className = 'awad-comment-form';
        form.innerHTML = `
            <input type="text" name="name" placeholder="${t('comments_name')}" required>
            <input type="email" name="email" placeholder="${t('comments_email')}">
            <textarea name="text" placeholder="${t('comments_comment')}" required></textarea>
            <button type="submit" class="awad-btn awad-btn-primary"><i class="fa-solid fa-paper-plane"></i> ${t('comments_submit')}</button>
        `;
        body.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            showToast('تم إرسال التعليق (تجريبي)', 'success');
            form.reset();
        });

        openModal('awad-comments-modal-backdrop');
    }

    // ===== رفع الصور (محاكاة) =====
    async function openUploadModal() {
        const body = document.getElementById('awad-upload-modal-body');
        if (!body) return;
        body.innerHTML = `<h3><i class="fa-solid fa-cloud-upload"></i> ${t('upload_center')}</h3><div id="awad-upload-container" style="width:100%; height:400px; border-radius:8px; overflow:hidden; border:1px solid var(--awad-border); background:var(--awad-surface); display:flex; align-items:center; justify-content:center;"><div class="awad-upload-placeholder">${t('upload_loading')}</div></div>`;
        openModal('awad-upload-modal-backdrop');
        setTimeout(() => {
            const container = document.getElementById('awad-upload-container');
            if (container) container.innerHTML = `<div style="text-align:center; padding:20px;">${t('upload_loading')}<br><small>${t('error_loading')}</small></div>`;
        }, 1500);
    }

    // ===== فتح/إغلاق النوافذ =====
    function openModal(modalId) {
        const backdrop = document.getElementById(modalId);
        if (backdrop) {
            backdrop.hidden = false;
            document.body.style.overflow = 'hidden';
        }
    }
    function closeModal(modalId) {
        const backdrop = document.getElementById(modalId);
        if (backdrop) {
            backdrop.hidden = true;
            document.body.style.overflow = '';
            if (modalId === 'awad-modal-backdrop') {
                document.getElementById('awad-modal-body').innerHTML = '';
                state.modalPartsSelection.clear();
            }
            if (modalId === 'awad-admin-modal-backdrop') {
                document.getElementById('awad-admin-modal-body').innerHTML = '';
            }
            if (modalId === 'awad-comments-modal-backdrop') {
                document.getElementById('awad-comments-modal-body').innerHTML = '';
            }
            if (modalId === 'awad-confirm-modal-backdrop') {
                document.getElementById('awad-confirm-modal-body').innerHTML = '';
            }
            if (modalId === 'awad-upload-modal-backdrop') {
                document.getElementById('awad-upload-modal-body').innerHTML = '';
            }
        }
    }

    // ===== Event Delegation =====
    root.addEventListener('click', e => {
        const target = e.target.closest('[data-action], [data-category], [data-nav]');
        if (!target) return;
        const action = target.dataset.action;
        const id = target.dataset.id ? Number(target.dataset.id) : null;
        const category = target.dataset.category;

        if (action === 'toggle-theme') toggleTheme();
        else if (action === 'toggle-language') toggleLanguage();
        else if (action === 'toggle-menu') {
            const nav = document.getElementById('awad-nav');
            if (nav) {
                nav.classList.toggle('awad-open');
                const toggle = document.getElementById('awad-menu-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', nav.classList.contains('awad-open'));
            }
        }
        else if (action === 'focus-search') document.getElementById('awad-search-input')?.focus();
        else if (action === 'search-submit') {
            state.query = document.getElementById('awad-search-input')?.value.trim() || '';
            state.visibleCount = PAGE_SIZE;
            renderLibrary();
            document.getElementById('awad-products-section')?.scrollIntoView({behavior:'smooth'});
        }
        else if (action === 'go-favorites') document.getElementById('awad-favorites-section')?.scrollIntoView({behavior:'smooth'});
        else if (action === 'toggle-filters') {
            const panel = document.getElementById('awad-filter-panel');
            if (panel) {
                panel.classList.toggle('awad-open');
                const toggle = document.getElementById('awad-filter-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', panel.classList.contains('awad-open'));
            }
        }
        else if (action === 'reset-filters') resetFilters();
        else if (action === 'details') showDetails(id);
        else if (action === 'download') {
            const topic = state.allTopicsData.find(t => t.topicId === id);
            if (topic) downloadTopic(topic);
        }
        else if (action === 'favorite') toggleFavorite(id);
        else if (action === 'share') shareItem(id);
        else if (action === 'close-modal') closeModal('awad-modal-backdrop');
        else if (action === 'close-admin-modal') closeModal('awad-admin-modal-backdrop');
        else if (action === 'close-comments-modal') closeModal('awad-comments-modal-backdrop');
        else if (action === 'close-confirm-modal') closeModal('awad-confirm-modal-backdrop');
        else if (action === 'close-upload-modal') closeModal('awad-upload-modal-backdrop');
        else if (action === 'download-selected') downloadSelected();
        else if (action === 'clear-selection') clearSelection();
        else if (action === 'download-all-parts') downloadAllParts(id);
        else if (action === 'select-all-parts') selectAllParts(id, true);
        else if (action === 'clear-parts') clearPartsSelection();
        else if (action === 'download-selected-parts') downloadSelectedParts(id);
        else if (action === 'download-part') downloadPart(id, Number(target.dataset.partIndex), target);
        else if (action === 'download-server') {
            openSafe(target.dataset.url);
            showToast(t('download_started'), 'success');
        }
        else if (action === 'show-comments') showComments(id);
        else if (action === 'admin-add-item') openAdminModal();
        else if (action === 'admin-edit-item') openAdminModal(id);
        else if (action === 'admin-delete-item') {
            const topic = state.allTopicsData.find(t => t.topicId === id);
            if (topic) confirmDelete(topic.delBtn);
        }
        else if (action === 'open-upload-modal') openUploadModal();
        else if (category) {
            state.filters = { platform:[], category:[], type:[], price:[], size:[], downloadType:[], status:[], favoritesOnly:false };
            if (platformKeys.includes(category)) state.filters.platform = [category];
            else state.filters.category = [category];
            state.visibleCount = PAGE_SIZE;
            renderLibrary();
            document.getElementById('awad-products-section')?.scrollIntoView({behavior:'smooth'});
        }
        else if (target.dataset.nav) {
            const map = {
                hero: 'awad-hero',
                categories: 'awad-categories-section',
                featured: 'awad-featured-section',
                products: 'awad-products-section',
                popular: 'awad-popular-section',
                favorites: 'awad-favorites-section',
                admin: 'awad-admin-panel'
            };
            const sectionId = map[target.dataset.nav];
            if (sectionId) document.getElementById(sectionId)?.scrollIntoView({behavior:'smooth'});
        }
    });

    root.addEventListener('change', e => {
        const target = e.target;
        if (target.classList.contains('awad-select-check')) {
            toggleSelect(target.dataset.id);
        } else if (target.matches('[data-filter-type]')) {
            const type = target.dataset.filterType;
            if (type === 'favoritesOnly') {
                state.filters.favoritesOnly = target.checked;
            } else {
                const value = target.dataset.filterValue;
                const arr = state.filters[type];
                if (target.checked) {
                    if (!arr.includes(value)) arr.push(value);
                } else {
                    state.filters[type] = arr.filter(v => v !== value);
                }
            }
            state.visibleCount = PAGE_SIZE;
            renderLibrary();
        } else if (target.classList.contains('awad-part-check')) {
            const partId = Number(target.dataset.partId);
            if (target.checked) state.modalPartsSelection.add(partId);
            else state.modalPartsSelection.delete(partId);
        } else if (target.id === 'awad-sort-select') {
            state.sort = target.value;
            state.visibleCount = PAGE_SIZE;
            renderLibrary();
        }
    });

    // ===== البحث =====
    let searchDebounce;
    document.getElementById('awad-search-input')?.addEventListener('input', () => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
            state.query = document.getElementById('awad-search-input')?.value.trim() || '';
            state.visibleCount = PAGE_SIZE;
            renderLibrary();
        }, 250);
    });

    // ===== زر الصعود =====
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('awad-scroll-top');
        if (btn) btn.classList.toggle('awad-visible', window.scrollY > 300);
    });
    document.getElementById('awad-scroll-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== زر تحميل المزيد =====
    document.getElementById('awad-load-more')?.addEventListener('click', () => {
        state.visibleCount += PAGE_SIZE;
        renderLibrary();
    });

    // ===== زر الإضافة العائم =====
    document.getElementById('awad-admin-fab')?.addEventListener('click', () => {
        if (isAdmin) openAdminModal();
    });

    // ===== إغلاق النوافذ بالنقر خارجها أو ESC =====
    ['awad-modal-backdrop', 'awad-admin-modal-backdrop', 'awad-comments-modal-backdrop', 'awad-confirm-modal-backdrop', 'awad-upload-modal-backdrop'].forEach(modalId => {
        const backdrop = document.getElementById(modalId);
        if (backdrop) {
            backdrop.addEventListener('click', e => {
                if (e.target === backdrop) closeModal(modalId);
            });
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            ['awad-modal-backdrop', 'awad-admin-modal-backdrop', 'awad-comments-modal-backdrop', 'awad-confirm-modal-backdrop', 'awad-upload-modal-backdrop'].forEach(modalId => {
                const backdrop = document.getElementById(modalId);
                if (backdrop && !backdrop.hidden) closeModal(modalId);
            });
        }
    });

    // ===== التهيئة =====
    function init() {
        applyTheme();
        applyLanguage();
        renderFilterPanel();
        renderSkeletons(document.getElementById('awad-featured-grid'), 4);
        renderSkeletons(document.getElementById('awad-products-grid'), 6);
        renderSkeletons(document.getElementById('awad-popular-grid'), 4);
        renderSkeletons(document.getElementById('awad-latest-grid'), 4);

        loadDlItems(`/f${DL_FORUM_ID}-montada`).then(() => {
            renderAdminItemsList();
        });
    }

    init();

})();
