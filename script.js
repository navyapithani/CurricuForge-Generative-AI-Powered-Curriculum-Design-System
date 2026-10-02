// Initialize
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let weeklyHours = 15;
const selectedSkills = new Set(['Python', 'SQL']);

// Skill gap analysis data
const skillGaps = [
  { skill: 'Machine Learning', current: 30, required: 85, priority: 'critical' },
  { skill: 'Deep Learning', current: 0, required: 75, priority: 'critical' },
  { skill: 'TensorFlow/PyTorch', current: 0, required: 80, priority: 'high' },
  { skill: 'Statistics', current: 60, required: 90, priority: 'medium' },
  { skill: 'Data Visualization', current: 40, required: 70, priority: 'medium' }
];

const weeklyPlan = [
  {
    week: 1,
    title: 'Foundations of Machine Learning',
    topics: ['ML Fundamentals', 'Supervised Learning Basics', 'Model Evaluation'],
    hours: 15,
    assessment: 'Classification Model Challenge'
  },
  {
    week: 2,
    title: 'Deep Learning Introduction',
    topics: ['Neural Networks', 'Backpropagation', 'CNNs'],
    hours: 15,
    assessment: 'Image Classification Project'
  },
  {
    week: 3,
    title: 'TensorFlow Essentials',
    topics: ['TF Fundamentals', 'Building Models', 'Training Pipelines'],
    hours: 15,
    assessment: 'Custom Model Implementation'
  },
  {
    week: 4,
    title: 'Advanced Statistics',
    topics: ['Statistical Inference', 'Hypothesis Testing', 'A/B Testing'],
    hours: 15,
    assessment: 'Statistical Analysis Report'
  }
];

// Toggle skill selection
function toggleSkill(element) {
  const skill = element.textContent.trim();
  element.classList.toggle('selected');
  
  if (selectedSkills.has(skill)) {
    selectedSkills.delete(skill);
  } else {
    selectedSkills.add(skill);
  }
}

// Update hours display
function updateHours(value) {
  weeklyHours = parseInt(value);
  const hoursDisplay = document.getElementById('hoursValue');
  if (hoursDisplay) {
    hoursDisplay.textContent = value + ' hrs/week';
  }
}

// Tab switching
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    }
  });
  
  contents.forEach(content => {
    content.classList.add('hidden');
  });
  
  const activeContent = document.getElementById('tab-' + tabName);
  if (activeContent) {
    activeContent.classList.remove('hidden');
  }
}

// Analyze skills
function analyzeSkills() {
  switchTab('gaps');
  
  const gapsTab = document.getElementById('tab-gaps');
  if (!gapsTab) return;
  
  // Reset content for loading state
  gapsTab.innerHTML = '<div class="text-center py-8"><div class="loader mx-auto mb-4"></div><p class="text-[var(--fg-soft)]">Analyzing your skill profile...</p></div>';
  
  // Show loading then results
  setTimeout(() => {
    displayGaps();
  }, prefersReducedMotion ? 100 : 2000);
}

// Display skill gaps
function displayGaps() {
  const gapsTab = document.getElementById('tab-gaps');
  if (!gapsTab) return;
  
  let html = '<h4 class="font-bold mb-4">Identified Skill Gaps</h4>';
  html += '<div class="space-y-3">';
  
  skillGaps.forEach((gap, index) => {
    const delay = prefersReducedMotion ? 0 : index * 0.1;
    const priorityColor = gap.priority === 'critical' ? 'var(--secondary)' : gap.priority === 'high' ? 'var(--warning)' : 'var(--accent)';
    
    html += '<div class="gap-item" style="animation-delay: ' + delay + 's">';
    html += '<div class="flex justify-between items-center mb-2">';
    html += '<span class="font-medium">' + gap.skill + '</span>';
    html += '<span class="text-xs px-2 py-1 rounded" style="background: ' + priorityColor + '20; color: ' + priorityColor + ';">' + gap.priority.toUpperCase() + '</span>';
    html += '</div>';
    html += '<div class="skill-meter">';
    html += '<div class="skill-fill" style="width: ' + gap.current + '%; background: linear-gradient(90deg, var(--accent), var(--secondary));"></div>';
    html += '</div>';
    html += '<div class="flex justify-between text-xs text-[var(--muted)] mt-1">';
    html += '<span>Current: ' + gap.current + '%</span>';
    html += '<span>Required: ' + gap.required + '%</span>';
    html += '</div>';
    html += '</div>';
  });
  
  html += '</div>';
  html += '<button class="btn-primary w-full mt-6" onclick="generatePlan()"><span>Generate Learning Plan</span></button>';
  
  gapsTab.innerHTML = html;
}

// Generate plan
function generatePlan() {
  switchTab('plan');
  
  const planOutput = document.getElementById('planOutput');
  if (!planOutput) return;
  
  let html = '<div class="flex items-center justify-between mb-6">';
  html += '<h4 class="font-bold">Your 4-Week Learning Plan</h4>';
  html += '<span class="text-sm text-[var(--accent)]">' + weeklyHours + ' hrs/week</span>';
  html += '</div>';
  
  weeklyPlan.forEach((week, index) => {
    const delay = prefersReducedMotion ? 0 : index * 0.15;
    html += '<div class="timeline-item" style="animation: slideIn 0.5s ease forwards; animation-delay: ' + delay + 's; opacity: 0;">';
    html += '<div class="flex justify-between items-start mb-2">';
    html += '<h5 class="font-semibold text-[var(--accent)]">Week ' + week.week + '</h5>';
    html += '<span class="text-xs text-[var(--muted)]">' + week.hours + ' hours</span>';
    html += '</div>';
    html += '<p class="font-medium mb-2">' + week.title + '</p>';
    html += '<div class="flex flex-wrap gap-1 mb-2">';
    week.topics.forEach(topic => {
      html += '<span class="text-xs px-2 py-1 rounded bg-[var(--bg)] text-[var(--fg-soft)]">' + topic + '</span>';
    });
    html += '</div>';
    html += '<div class="text-xs text-[var(--fg-soft)]"><span class="text-[var(--secondary)]">Assessment:</span> ' + week.assessment + '</div>';
    html += '</div>';
  });
  
  html += '<button class="btn-secondary w-full mt-6" onclick="switchTab(\'skills\')">Start Over</button>';
  
  planOutput.innerHTML = html;
}

// Scroll to demo
function scrollToDemo() {
  const demo = document.getElementById('demo');
  if (demo) {
    demo.scrollIntoView({ behavior: 'smooth' });
  }
}

// Scroll reveal
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// Animate counters
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = prefersReducedMotion ? 0 : 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOut);
      
      counter.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    if (duration > 0) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
  
  const statsSection = document.querySelector('[data-count]')?.closest('section');
  if (statsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    
    counterObserver.observe(statsSection);
  }




  function analyzeSkills() {
  fetch("/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      skills: ["Python", "SQL"]
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.result);
  });
}

});