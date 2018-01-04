---
title: 불확정성의 원리와 수학적 이해와 관련 연구 주제
date: 2017/08/04
categories:
  - [수학 이야기]
  - [진로]
authors:
  - name: 윤상균
    title: 수학과 박사과정

---
안녕하세요. 졸업생 윤상균이라고 합니다. 비가환해석학을 전공하고 있고, 이번 기회에 재미있는 연구주제를 하나 소개해보도록 하겠습니다. 이 연구주제는 그 유명한 불확정성 원리와 관련됩니다.

Heisenberg의 불확정성 원리는 입자의 위치와 운동량을 동시에 측정할 수는 없다는 것을 의미합니다. 이에 관련된 역사나 물리학적인 의미는 저보다 물리학을 잘하는 위키피디아를 참고하시기 바랍니다. 저는 이 원리를 수학적으로 이해하는 한 방법을 소개해드리려고 합니다.

Fourier 해석학에서의 한 가지 알려진 사실을 소개하겠습니다. $\int_\mathbb{R} |f(x)|^{2}dx=1$인 함수 $f$에 대하여 함수 $\hat{f}(\xi)=\int_{\mathbb{R}}f(x)e^{-i\xi x}$를 정의하면, 재미있게도 $\int_\mathbb{R} |\hat{f}(\xi)|^{2}d\xi = 1$이 성립한다는 것입니다.

이제 물리 이야기로 돌아가보죠. 확률분포함수 $a(x)\geq 0$, $\int_\mathbb{R} a(x)dx = 1 $ 를 생각하겠습니다. 이 엔트로피 값은
$$H(a)=-\int_\mathbb{R} a(x)\log a(x)dx$$
로 정의합니다. 이 값은 확률분포함수 $a(x)$의 표준편차가 얼마나 클 지를 가늠케 합니다. 가령 $a_t(x) = \begin{cases} \frac{1}{2t} & -t \leq x \leq t \\ 0 & otherwise \end{cases}$, $0<t<\infty$, 의 경우 $t\rightarrow 0$ 일 때 분포가 평균 주변에 밀집해 있을 것이며, $t\rightarrow \infty $ 라면 그 반대의 양태를 보일 것입니다. 이 때, $H(a_t)=\log (2t)$ 임을 살펴보면 위의 주장이 꽤나 타당하다는 것을 확인할 수 있습니다.

Hirschman[^4]과 Beckner[^2]가 밝혀낸 바는, $\int_\mathbb{R}|f(x)|^2 dx = 1$ 일 때
$$ H(|f|^2) + H(|\hat{f}|^2) \geq \log (\pi e) \approx 0.9314$$
가 성립한다는 것입니다. 다시 말하면, $|f|^2$와 $|\hat{f}|^2$의 분포가 동시에 각각의 평균 근방에 밀집해 있을 수는 없다는 의미입니다. 실제로 $b_t = a_t^\frac{1}{2}$를 생각해보면, $\int_\mathbb{R}b_t^2(x)dx = \int_\mathbb{R}a_t(x)dx=1$이고 근사적으로
$$ H(|b_t|^2) + H(|\hat{b_t}|^2) = 2tH(|\hat{a_t}|^2)  \approx 5.28 \ \forall t >0 $$
이 성립합니다.

위에서 보신 것이 널리 알려져 있는 '실공간 $\mathbb{R}$위에서의' 불확정성 원리입니다. 좋은 소식인 동시에 두려운 소식이기도 한 것은 Fourier 해석학이 리군, 혹은 양자공간에서도 전개된다는 것입니다. 즉, $\int |f|^2 =1$인 $f$마다 이에 대응하는 $\hat{f}$와 다음의 부등식
$$H(|f|^2) + H(|\hat{f}|^2) \geq K $$
를 떠올릴 수 있습니다. 저러한 상수 $K$는 임의의 리군, 그리고 임의의 양자공간마다 항상 존재할까요? 리군, 양자공간에 의존하지 않는 상수로서 존재할까요? 혹은 어떤 양자공간에 대해서는 없을 수도 있지 않을까요? 문제를 해결하셔서 미래에 "불확정성 원리를 만족하지 않는 특정 양자상태"와 같은 제목으로 논문을 게재해보세요.



[^1]: Alagic, G., Russell, A. (2008). Uncertainty principles for compact groups. Illinois Journal of Mathematics, 52(4), 1315-1324.
[^2]: Beckner, W. (1975). Inequalities in Fourier analysis. Annals of Mathematics, 159-182.
[^3]: Crann, J., Kalantar, M. (2014). An uncertainty principle for unimodular quantum groups. Journal of Mathematical Physics, 55(8), 081704.
[^4]: Hirschman, I. I. (1957). A note on entropy. American journal of mathematics, 79(1), 152-156.
